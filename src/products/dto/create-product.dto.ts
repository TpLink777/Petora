
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

/**
 * DTO para crear un producto.
 *
 * Solo `title` y `type` son obligatorios; el resto de campos son opcionales.
 * Las imágenes se envían como un arreglo de URLs.
 */
export class CreateProductDto {

    /** Título del producto; obligatorio y no vacío. */
    @IsString()
    @MinLength(1)
    title: string

    /** Precio positivo. Opcional. */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    /** Descripción libre. Opcional. */
    @IsString()
    @IsOptional()
    description?: string

    /** Slug amigable. Si se omite, se genera a partir del título. */
    @IsString()
    @IsOptional()
    slug?: string

    /** Stock inicial (entero positivo). Opcional. */
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    /** Categoría o tipo del producto; obligatorio. */
    @IsString()
    @MinLength(1)
    type: string

    /** Etiquetas del producto. Opcional. */
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]

    /** URLs de las imágenes del producto. Opcional. */
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]

}
