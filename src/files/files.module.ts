import { Module } from '@nestjs/common';
import { FilesService } from './files.service.js';
import { FilesController } from './files.controller.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

/**
 * Módulo de archivos.
 *
 * Registra `FilesController` y `FilesService`, e importa `CloudinaryModule`
 * para delegar la subida de imágenes al servicio de Cloudinary.
 */
@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CloudinaryModule]
})
export class FilesModule {}
