
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

@Controller('files')
export class FilesController {


  constructor(
    private readonly cloudinaryService: CloudinaryService
  ) { }


  @Post('upload')
  //! Sirve para interceptar la solicitud y extraer el archivo del cuerpo de la solicitud.
  //! El nombre del campo que contiene el archivo es 'image'.

  @UseInterceptors(FileInterceptor('image'))  //! Se utiliza para interceptar la solicitud y extraer el archivo del cuerpo de la solicitud.))

  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/
          })
        ]
      })
    ) //! Se utiliza para validar y analizar el archivo subido.
    file: Express.Multer.File //! El tipo de archivo subido
  ) {

    const res = await this.cloudinaryService.uploadImages(file)

    return {
      message: 'Archivo recibido correctamente',
      url: res.secure_url
    }
  }
}
