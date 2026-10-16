
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service.js';
import { User } from '../auth/entities/user.entity.js';
import { initialData } from './data/seed-data.js';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly productServices: ProductsService
  ) { }


  async runSeed() {

    await this.deleteTables()

    const adminUser = await this.insertUsers()
    await this.insertProducts(adminUser)

    return `Seed Execute`;
  }


  private async deleteTables() {
    await this.productServices.deleteAllProducts()
    await this.userRepository.deleteAll()
  }


  private async insertUsers() {

    const seedDataUsers = await Promise.all(
      initialData.users.map(user => (
        this.userRepository.create(user)
      ))
    )

    await this.userRepository.save(seedDataUsers)

    return seedDataUsers[0]
  }

  private async insertProducts(user: User) {
    await Promise.all(
      initialData.products.map(product => (
        this.productServices.create( product, user )
      ))
    )
  }

}