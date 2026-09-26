
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';
import { Product, ProductImage } from './entities/index.js';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource

  ) { }



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


  async create(createProductDto: CreateProductDto) {

    const { images = [], ...productDetails } = createProductDto

    try {

      const product = this.productsRepository.create({
        ...productDetails,
        images: images.map(
          url => this.productImageRepository.create({ url })
        )
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




  async update(id: string, updateProductDto: UpdateProductDto) {

    const { images, ...toUpdate } = updateProductDto

    const product = await this.productsRepository.preload({ id, ...toUpdate })

    if (!product) throw new NotFoundException(`El producto con id ${id} no fue encontrado`)

    //! Inicio de la transacción para actualizar el producto y sus imágenes

    const queryRunner = this.dataSource.createQueryRunner() //! Crear un query runner para manejar la transacción
    await queryRunner.connect() //! Conectar la base de datos
    await queryRunner.startTransaction() //! Iniciar la transacción

    try {

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } }) //! Eliminar las imágenes existentes del producto

        product.images = images.map((url) => { //! Crear nuevas imágenes para el producto
          return this.productImageRepository.create({ url })
        })
      }

      await queryRunner.manager.save(product) //! Guardar el producto y sus imágenes en la base de datos
      await queryRunner.commitTransaction() //! Confirmar la transacción
      await queryRunner.release() //! Liberar el query runner


      return this.findDataPlain(id) //! Retornar el producto actualizado con sus imágenes

    } catch (err) {

      await queryRunner.rollbackTransaction() //! Revertir la transacción en caso de error
      await queryRunner.release() //! Liberar el query runner

      this.handleDBExeptions(err)
    }
  }


  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productsRepository.remove(product)

    return {
      message: `Producto con id: ${id} eliminado correctamente`,
    };
  }


  private handleDBExeptions(err: any) {
    if (err.code === '23505')
      throw new BadRequestException(`${err.detail}`)

    this.logger.error(err)
    throw new InternalServerErrorException('Error inisperado en el servidor, revisa los logs!')
  }


  async findDataPlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term)
    return {
      ...rest,
      images: images.map(img => img.url)
    }
  }



  async deleteAllProducts() {
    try {
      return await this.productsRepository.deleteAll()
    } catch (err) {
      this.handleDBExeptions(err)
    }

  }

}
