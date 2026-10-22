
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

/**
 * Controlador de carga de archivos.
 *
 * Expone `POST /api/petora/files/upload` para recibir una imagen por
 * `multipart/form-data` (campo `image`), validarla y subirla a Cloudinary.
 */
@Controller('files')
export class FilesController {

  constructor(
    private readonly cloudinaryService: CloudinaryService
  ) { }

  /**
   * Sube una imagen a Cloudinary.
   *
   * `FileInterceptor('image')` extrae el archivo del cuerpo de la petición.
   * `ParseFilePipe` valida que:
   * - El archivo sea obligatorio.
   * - No supere los 5 MB.
   * - Su tipo MIME sea `image/jpeg`, `image/png` o `image/webp`.
   *
   * @param file Archivo recibido por Multer en memoria.
   * @returns Mensaje de confirmación y la URL segura (`secure_url`) de Cloudinary.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/
          })
        ]
      })
    )
    file: Express.Multer.File
  ) {

    const result = await this.cloudinaryService.uploadImages(file)

    return {
      message: 'Archivo recibido correctamente',
      url: result.secure_url
    }
  }
}
