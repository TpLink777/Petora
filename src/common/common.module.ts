import { Module } from '@nestjs/common';

/**
 * Módulo de utilidades compartidas.
 *
 * Actualmente no declara controladores ni providers; sirve como punto de
 * agrupación para DTOs y helpers comunes (por ejemplo, `PaginationDto`).
 * Se mantiene importado en `AppModule` para futuras extensiones.
 */
@Module({})
export class CommonModule {}
