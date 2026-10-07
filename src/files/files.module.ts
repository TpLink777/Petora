import { Module } from '@nestjs/common';
import { FilesService } from './files.service.js';
import { FilesController } from './files.controller.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CloudinaryModule]
})
export class FilesModule {}
