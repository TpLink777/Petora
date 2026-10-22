
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

/**
 * Servicio de integración con Cloudinary.
 *
 * Configura el SDK con las credenciales del entorno y expone la subida de
 * imágenes mediante un stream, sin escribir archivos temporales en disco.
 */
@Injectable()
export class CloudinaryService {

  /**
   * Configura el SDK de Cloudinary al construir el servicio.
   *
   * @param configService Provee `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`
   * y `CLOUDINARY_API_SECRET`.
   * @throws Si alguna de las variables requeridas no está definida.
   */
  constructor(
    private readonly configService: ConfigService
  ) {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow<string>('CLOUDINARY_API_SECRET')
    })
  }


  /**
   * Sube una imagen a la carpeta `Petora_Images` de Cloudinary.
   *
   * El archivo debe llegar en memoria (`file.buffer`), tal como lo entrega
   * Multer con `FileInterceptor`. Se aceptan los formatos PNG, JPEG y WEBP.
   *
   * @param file Archivo de imagen recibido por Multer.
   * @returns Respuesta de Cloudinary, incluida la URL en `secure_url`.
   * @throws BadRequestException Si el archivo no tiene contenido.
   * @throws Error Si Cloudinary falla o no devuelve un resultado.
   */
  async uploadImages(file: Express.Multer.File): Promise<UploadApiResponse> {

    if (!file.buffer.length) {
      throw new BadRequestException(
        'No se recibió un archivo válido',
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'Petora_Images',
          allowed_formats: ['png', 'jpeg', 'webp'],
          resource_type: 'image'
        },
        (error, result) => {
          if (error) {
            return reject(error)
          }

          if (!result) {
            return reject(new Error('Cloudinary no devolvió ningún resultado'));
          }

          resolve(result)
        }
      )
      uploadStream.end(file.buffer)
    })
  }
}
