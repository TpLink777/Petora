import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service.js';

/**
 * Módulo de integración con Cloudinary.
 *
 * Proporciona y exporta `CloudinaryService` para que otros módulos (como
 * `FilesModule`) puedan subir imágenes.
 */
@Module({
  providers: [ CloudinaryService ],
  exports: [ CloudinaryService ]
})
export class CloudinaryModule {}
