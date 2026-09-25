
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) { }



  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto

    return await this.productsRepository.find({
      take: limit,
      skip: offset
      // TODO: Relaciones
    })
  }


  async findOne(term: string) {

    let product: Product | null

    if (!term)
      throw new NotFoundException(`El termino de busqueda del producto es requerido`)

    if (isUUID(term)) {
      product = await this.productsRepository.findOneBy({ id: term })
    } else {

      const queryBuilder = this.productsRepository.createQueryBuilder()

      product = await
        queryBuilder
          .where(`UPPER(title) =:title OR slug =:slug`, {
            title: term.toUpperCase(),
            slug: term.toLowerCase()
          }).getOne()
    }

    if (!product)
      throw new NotFoundException(`El producto con id ${term} no fue encontrado`)

    return product
  }



  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto)
      await this.productsRepository.save(product)

      return {
        message: 'Producto creado exitosamnete',
        product
      }
    } catch (err) {
      this.handleDBExeptions(err)
    }
  }




  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productsRepository.preload({
      id: id,
      ...updateProductDto
    })

    if (!product)
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`)

    try {

      await this.productsRepository.save(product)

      return {
        message: 'Producto actualizado exitosamente',
        product
      }
    } catch (err) {
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
}
