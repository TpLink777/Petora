
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';
import { Product, ProductImage } from './entities/index.js';
import { User } from '../auth/entities/user.entity.js';

/**
 * Servicio de productos.
 *
 * Contiene la lógica de negocio del catálogo: consultas paginadas, búsquedas
 * por UUID/título/slug, creación y actualización transaccional de productos
 * con sus imágenes, eliminación y limpieza total para el seed.
 */
@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  /**
   * @param productsRepository Repositorio de productos.
   * @param productImageRepository Repositorio de imágenes de productos.
   * @param dataSource Fuente de datos usada para manejar transacciones.
   */
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource

  ) { }



  /**
   * Lista productos con paginación.
   *
   * @param paginationDto `limit` (10 por defecto) y `offset` (0 por defecto).
   * @returns Productos con la propiedad `images` convertida a un arreglo de URLs.
   */
  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto

    const products = await this.productsRepository.find({
      take: limit,
      skip: offset,
      relations: { images: true }
    })

    return products.map(({ images, ...rest }) => ({
      ...rest,
      images: images.map(img => img.url)
    }))
  }


  /**
   * Busca un producto por UUID, título exacto (sin distinguir mayúsculas) o slug.
   *
   * @param term UUID, título o slug del producto.
   * @returns Producto encontrado con sus imágenes cargadas.
   * @throws NotFoundException Si el término está vacío o no existe el producto.
   */
  async findOne(term: string) {

    let product: Product | null

    if (!term)
      throw new NotFoundException(`El termino de busqueda del producto es requerido`)

    if (isUUID(term)) {
      product = await this.productsRepository.findOneBy({ id: term })
    } else {
      const queryBuilder = this.productsRepository.createQueryBuilder('prod')

      product = await
        queryBuilder
          .where(`UPPER(title) =:title OR slug =:slug`, {
            title: term.toUpperCase(),
            slug: term.toLowerCase()
          })
          .leftJoinAndSelect('prod.images', 'prodImages')
          .getOne()
    }

    if (!product)
      throw new NotFoundException(`El producto con id ${term} no fue encontrado`)

    return product
  }


  /**
   * Crea un producto y lo asocia al usuario indicado.
   *
   * Convierte cada URL de `images` en una entidad `ProductImage` y guarda todo
   * en cascada gracias a la configuración de la relación.
   *
   * @param createProductDto Datos del producto.
   * @param user Usuario propietario del producto.
   * @returns Mensaje de confirmación y el producto creado.
   * @throws BadRequestException Si el título o el slug ya existen.
   */
  async create(createProductDto: CreateProductDto, user: User) {

    const { images = [], ...productDetails } = createProductDto

    try {

      const product = this.productsRepository.create({
        ...productDetails,
        images: images.map(
          url => this.productImageRepository.create({ url })
        ),
        user: user
      })

      await this.productsRepository.save(product)

      return {
        message: 'Producto creado exitosamnete',
        ...product,
        images
      }

    } catch (err) {
      this.handleDBExeptions(err)
    }
  }




  /**
   * Actualiza un producto y, opcionalmente, reemplaza sus imágenes.
   *
   * Se ejecuta dentro de una transacción para que el producto y sus imágenes
   * queden consistentes: si algo falla, se revierte todo (`rollback`).
   *
   * @param id UUID del producto.
   * @param updateProductDto Campos a actualizar.
   * @param user Usuario que realiza la actualización.
   * @returns El producto actualizado con sus imágenes como URLs.
   * @throws NotFoundException Si el producto no existe.
   * @throws BadRequestException Si se viola una restricción de unicidad.
   */
  async update(id: string, updateProductDto: UpdateProductDto, user: User) {

    const { images, ...toUpdate } = updateProductDto

    const product = await this.productsRepository.preload({ id, ...toUpdate })

    if (!product) throw new NotFoundException(`El producto con id ${id} no fue encontrado`)

    // Inicio de la transacción para actualizar el producto y sus imágenes.
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {

      if (images) {
        // Si llegan imágenes nuevas, se eliminan las anteriores.
        await queryRunner.manager.delete(ProductImage, { product: { id } })

        product.images = images.map((url) => {
          return this.productImageRepository.create({ url })
        })
      }


      product.user = user

      await queryRunner.manager.save(product)
      await queryRunner.commitTransaction()
      await queryRunner.release()


      return this.findDataPlain(id)

    } catch (err) {

      await queryRunner.rollbackTransaction()
      await queryRunner.release()

      this.handleDBExeptions(err)
    }
  }


  /**
   * Elimina un producto y, en cascada, sus imágenes.
   *
   * @param id UUID del producto.
   * @returns Mensaje de confirmación.
   * @throws NotFoundException Si el producto no existe.
   */
  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productsRepository.remove(product)

    return {
      message: `Producto con id: ${id} eliminado correctamente`,
    };
  }


  /**
   * Traduce errores de base de datos a excepciones HTTP.
   *
   * El código `23505` de PostgreSQL indica una violación de unicidad y se
   * responde con `BadRequestException`. Cualquier otro error se registra y se
   * responde con `InternalServerErrorException`.
   *
   * @param err Error capturado.
   */
  private handleDBExeptions(err: any) {
    if (err.code === '23505')
      throw new BadRequestException(`${err.detail}`)

    this.logger.error(err)
    throw new InternalServerErrorException('Error inisperado en el servidor, revisa los logs!')
  }


  /**
   * Devuelve un producto con sus imágenes como un arreglo de URLs.
   *
   * @param term UUID, título o slug del producto.
   * @returns Producto "plano" listo para responder por HTTP.
   */
  async findDataPlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term)
    return {
      ...rest,
      images: images.map(img => img.url)
    }
  }



  /**
   * Elimina todos los productos de la base de datos.
   * Se usa antes de volver a ejecutar el seed.
   *
   * @returns Resultado de la operación de borrado.
   */
  async deleteAllProducts() {
    try {
      return await this.productsRepository.deleteAll()
    } catch (err) {
      this.handleDBExeptions(err)
    }

  }

}
