
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service.js';
import { SeedController } from './seed.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { AuthModule } from '../auth/auth.module.js';

/**
 * Módulo de datos iniciales.
 *
 * Importa `ProductsModule` para reutilizar `ProductsService` al insertar
 * productos y `AuthModule` para acceder al repositorio de usuarios.
 */
@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule
  ]
})
export class SeedModule { }
