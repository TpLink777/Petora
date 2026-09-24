
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')


  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) { }


  private handleDBExeptions(err: any) {
    if (err.code === '23505')
      throw new BadRequestException(`${err.detail}`)

    this.logger.error(err)
    throw new InternalServerErrorException('Error inisperado en el servidor, revisa los logs!')
  }


  async findAll(paginationDto : PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto

    return await this.productsRepository.find({
      take: limit,
      skip: offset
      // TODO: Relaciones
    })
  }


  async findOne(id: string) {

    if (!id)
      throw new NotFoundException(`El id del producto es requerido`)


    const product = await this.productsRepository.findOneBy({ id })

    if (!product)
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`)

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




  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }




  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productsRepository.remove(product)

    return {
      message: `Producto con id: ${id} eliminado correctamente`,
    };
  }




}
