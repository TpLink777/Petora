
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module.js';
import { CommonModule } from './common/common.module.js';
import { SeedModule } from './seed/seed.module.js';
import { FilesModule } from './files/files.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { AuthModule } from './auth/auth.module.js';

/**
 * Módulo raíz de la aplicación.
 *
 * Configura y conecta las piezas principales del sistema:
 * - `ConfigModule`: carga las variables de entorno desde `.env` y las expone globalmente.
 * - `TypeOrmModule`: conecta con PostgreSQL usando las variables `DB_*`.
 *   `autoLoadEntities` registra automáticamente las entidades usadas con `forFeature`.
 *   `synchronize: true` mantiene el esquema de la base de datos sincronizado con las
 *   entidades; es útil en desarrollo, pero debe desactivarse en producción y usarse
 *   migraciones en su lugar.
 * - `ProductsModule`: CRUD de productos e imágenes.
 * - `CommonModule`: utilidades compartidas (paginación).
 * - `SeedModule`: carga de datos iniciales de prueba.
 * - `FilesModule`: carga de archivos.
 * - `CloudinaryModule`: integración con Cloudinary.
 * - `AuthModule`: registro, login, JWT y autorización por roles.
 */
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    CloudinaryModule,
    AuthModule,
  ],
})

export class AppModule { }
