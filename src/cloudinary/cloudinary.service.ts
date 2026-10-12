
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

@Injectable()
export class CloudinaryService {

  constructor(
    private readonly configService: ConfigService
  ) {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow<string>('CLOUDINARY_API_SECRET')
    })
  }


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
        (error, result) => { //! cb
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
