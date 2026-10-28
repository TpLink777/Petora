
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

/**
 * DTO reutilizable para paginar resultados.
 *
 * Se usa como query string, por ejemplo: `?limit=10&offset=0`.
 * `@Type(() => Number)` convierte los valores de texto de la URL a números
 * antes de ejecutar las validaciones.
 */
export class PaginationDto {


    /** Cantidad máxima de resultados a devolver. Debe ser positiva. */
    @ApiProperty({
        description: 'Cantidad máxima de resultados a devolver. Debe ser mayor que cero.',
        example: 10,
        minimum: 1,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number

    /** Cantidad de resultados a omitir desde el inicio. Debe ser mayor o igual a 0. */
    @ApiProperty({
        description: 'Cantidad de resultados a omitir desde el inicio',
        example: 0,
        minimum: 0,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number
}
