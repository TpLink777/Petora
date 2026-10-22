
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { Product, ProductImage } from './entities/index.js';
import { AuthModule } from '../auth/auth.module.js';

/**
 * Módulo de productos.
 *
 * Registra los repositorios de `Product` y `ProductImage`, expone el
 * controlador del catálogo e importa `AuthModule` para poder autenticar y
 * autorizar las peticiones. Exporta `ProductsService` para que `SeedModule`
 * pueda reutilizarlo.
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage
    ]),
    AuthModule
  ],
  exports: [ProductsService]
})
export class ProductsModule { }
