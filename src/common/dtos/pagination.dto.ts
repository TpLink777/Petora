
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
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number

    /** Cantidad de resultados a omitir desde el inicio. Debe ser mayor o igual a 0. */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number
}
