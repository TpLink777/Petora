
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

/**
 * DTO para crear un producto.
 *
 * Solo `title` y `type` son obligatorios; el resto de campos son opcionales.
 * Las imágenes se envían como un arreglo de URLs.
 */
export class CreateProductDto {

    /** Título del producto; obligatorio y no vacío. */
    @ApiProperty({
        description: 'Título del producto',
        example: 'Collar antipulgas para perro',
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string

    /** Precio positivo. Opcional. */
    @ApiProperty({
        description: 'Precio unitario del producto. Debe ser mayor que cero.',
        example: 49.99,
        minimum: 0,
        required: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    /** Descripción libre. Opcional. */
    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Collar ajustable con tratamiento antipulgas para perros de raza mediana.',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string

    /** Slug amigable. Si se omite, se genera a partir del título. */
    @ApiProperty({
        description: 'Slug amigable usado en búsquedas y URLs. Si se omite, se genera a partir del título.',
        example: 'collar_antipulgas_para_perro',
        required: false,
    })
    @IsString()
    @IsOptional()
    slug?: string

    /** Stock inicial (entero positivo). Opcional. */
    @ApiProperty({
        description: 'Cantidad inicial de unidades en inventario. Debe ser mayor que cero.',
        example: 25,
        minimum: 0,
        required: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    /** Categoría o tipo del producto; obligatorio. */
    @ApiProperty({
        description: 'Categoría o tipo de producto',
        example: 'accesorios',
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    type: string

    /** Etiquetas del producto. Opcional. */
    @ApiProperty({
        description: 'Etiquetas para búsqueda y filtrado del producto',
        example: ['perros', 'antipulgas'],
        type: [String],
        required: false,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]

    /** URLs de las imágenes del producto. Opcional. */
    @ApiProperty({
        description: 'URLs públicas de las imágenes del producto',
        example: [
            'https://res.cloudinary.com/petora/image/upload/v1/productos/collar-antipulgas.jpg',
        ],
        type: [String],
        required: false,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]

}
