
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service.js';
import { initialData } from './data/seed-data.js';

@Injectable()
export class SeedService {

  constructor(
    private readonly productServices: ProductsService
  ) { }


  async runSeed() {
    await this.insertNewProducts()

    return `Seed Execute`;
  }


  private async insertNewProducts() {
    await this.productServices.deleteAllProducts() //! eliminacion antes de la insercion

    await Promise.all( //! esperar a que todas las promesas se resuelvan antes de continuar
      initialData.products.map(product => (
         this.productServices.create(product) //! crear el producto en la base de datos
      ))
    )
  }

}