
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service.js';

/**
 * Controlador para ejecutar el seed de datos.
 *
 * Expone `GET /api/petora/seed`, que borra los datos actuales y vuelve a
 * insertar los usuarios y productos de ejemplo.
 *
 * Nota: el endpoint es público. En producción debería protegerse con
 * `@SuperAdminAuth()` (importado desde `../auth/decorators/index.js`) para
 * evitar borrados accidentales.
 */
@Controller('seed')
export class SeedController {

  constructor(
    private readonly seedService: SeedService
  ) {}

  /** Ejecuta el seed completo y devuelve un mensaje de confirmación. */
  @Get()
  //@SuperAdminAuth()
  executeSeed() {
    return this.seedService.runSeed();
  }
}

