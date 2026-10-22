
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service.js';
import { User } from '../auth/entities/user.entity.js';
import { initialData } from './data/seed-data.js';

/**
 * Servicio de datos iniciales (seed).
 *
 * Restablece la base de datos a un estado conocido: elimina los productos y
 * usuarios existentes, vuelve a insertar los usuarios de `initialData` y crea
 * los productos asociados al primer usuario (superAdmin).
 *
 * Debe ejecutarse solo en desarrollo o en entornos de prueba.
 */
@Injectable()
export class SeedService {

  /**
   * @param userRepository Repositorio de usuarios.
   * @param productServices Servicio reutilizado para crear los productos.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly productServices: ProductsService
  ) { }


  /**
   * Ejecuta el seed completo.
   *
   * @returns Mensaje de confirmación (`Seed Execute`).
   */
  async runSeed() {

    await this.deleteTables()

    const adminUser = await this.insertUsers()
    await this.insertProducts(adminUser)

    return `Seed Execute`;
  }


  /**
   * Borra todos los productos y usuarios existentes.
   * Primero elimina los productos para respetar la clave foránea hacia usuarios.
   */
  private async deleteTables() {
    await this.productServices.deleteAllProducts()
    await this.userRepository.deleteAll()
  }


  /**
   * Inserta los usuarios de `initialData`.
   *
   * @returns El primer usuario insertado, usado como propietario de los productos.
   */
  private async insertUsers() {

    const seedDataUsers = await Promise.all(
      initialData.users.map(user => (
        this.userRepository.create(user)
      ))
    )

    await this.userRepository.save(seedDataUsers)

    return seedDataUsers[0]
  }


  /**
   * Inserta los productos de `initialData` asociados al usuario indicado.
   *
   * @param user Usuario propietario de los productos.
   */
  private async insertProducts(user: User) {
    await Promise.all(
      initialData.products.map(product => (
        this.productServices.create( product, user )
      ))
    )
  }

}
