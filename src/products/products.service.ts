
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

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


  findAll() {
    return `This action returns all products`;
  }



  findOne(id: number) {
    return `This action returns a #${id} product`;
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





  remove(id: number) {
    return `This action removes a #${id} product`;
  }




}
