
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

/**
 * Punto de entrada de la aplicación Petora.
 *
 * Responsabilidades:
 * - Crear la aplicación NestJS a partir de `AppModule`.
 * - Registrar el prefijo global `api/petora` para todas las rutas HTTP.
 * - Activar la validación global de DTOs mediante `ValidationPipe`:
 *   - `whitelist`: elimina las propiedades que no estén declaradas en el DTO.
 *   - `forbidNonWhitelisted`: rechaza la petición si llegan propiedades no permitidas.
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

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App running on port ${ process.env.PORT }`)

}

await main();
