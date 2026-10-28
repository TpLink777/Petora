
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Punto de entrada de la aplicación Petora.
 *
 * Responsabilidades:
 * - Crear la aplicación NestJS a partir de `AppModule`.
 * - Registrar el prefijo global `api/petora` para todas las rutas HTTP.
 * - Activar la validación global de DTOs mediante `ValidationPipe`:
 *   - `whitelist`: elimina las propiedades que no estén declaradas en el DTO.
 *   - `forbidNonWhitelisted`: rechaza la petición si llegan propiedades no permitidas.
 * - Publicar la documentación OpenAPI en `/api/docs`.
 * - Iniciar el servidor en el puerto definido en `PORT` (3000 por defecto).
 *
 * Las variables de entorno son cargadas por `ConfigModule` dentro de `AppModule`.
 */
async function main() {

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main')

  // Todas las rutas quedan disponibles bajo: /api/petora/...
  app.setGlobalPrefix('api/petora')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )


  /**
   * Configuración de la documentación OpenAPI (Swagger).
   *
   * - `setTitle`, `setDescription` y `setVersion`: metadatos que se muestran en
   *   la cabecera de Swagger UI. La descripción admite Markdown.
   * - `addBearerAuth`: registra el esquema de seguridad JWT para que el botón
   *   «Authorize» envíe `Authorization: Bearer <token>` a las rutas protegidas.
   *   El nombre `bearer` es el que deben referenciar los controladores con
   *   `@ApiBearerAuth('bearer')`.
   * - `addTag`: agrupa los endpoints por dominio en la UI. Para que cada grupo
   *   tenga contenido, los controladores deben declarar `@ApiTags('auth')`, etc.
   *
   * El documento se publica en `/api/docs` y su JSON OpenAPI en
   * `/api/docs-json`. Esa ruta es independiente del prefijo global
   * `api/petora`, que ya viene incluido en cada endpoint del documento.
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Petora API')
    .setDescription(
      [
        'API de Petora para autenticación de usuarios, catálogo de productos y carga de imágenes.',
        '',
        '### Autenticación',
        'Los endpoints protegidos requieren un token JWT en la cabecera:',
        '',
        '```http',
        'Authorization: Bearer <token>',
        '```',
        '',
        'Obtén el token con `POST /api/petora/auth/login` y pégalo en el botón **Authorize**.',
      ].join('\n')
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT devuelto por /api/petora/auth/login',
      },
      'bearer'
    )
    .build();

  // Se genera por petición para que el documento refleje siempre el estado actual.
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/docs-json', // ruta para obtener el JSON OpenAPI
    customSiteTitle: 'Petora API · Documentación', // título de la pestaña del navegador
    swaggerOptions: { // opciones de Swagger UI
      persistAuthorization: true, // conserva el JWT al recargar la página
      displayRequestDuration: true, // muestra el tiempo de respuesta de cada endpoint
      filter: true, // permite filtrar los endpoints por nombre o descripción
      docExpansion: 'none', // colapsa todos los grupos al abrir la UI
      operationsSorter: 'method', // ordena los endpoints dentro de cada grupo
      tagsSorter: 'alpha', // ordena los grupos existentes
      tryItOutEnabled: true, // permite probar los endpoints desde la UI
    },
  });


  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${process.env.PORT}`)
  logger.log('Swagger docs available at /api/docs')

}

await main();
