
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Product } from "./product.entity.js";

/**
 * Entidad que representa una imagen asociada a un producto.
 *
 * Se mapea a la tabla `products_images`. La relación es N:1 con `Product`:
 * un producto puede tener muchas imágenes, pero cada imagen pertenece a un
 * solo producto. Al eliminar el producto, sus imágenes se eliminan en cascada.
 */
@Entity({ name: 'products_images' })
export class ProductImage {

    /** Identificador único generado como UUID. */
    @ApiProperty({
        description: 'Identificador único de la imagen',
        example: '4d1f8a3e-9b2c-4f6a-8e1d-2a7c5b9f0e3d',
        format: 'uuid',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** URL pública de la imagen. */
    @ApiProperty({
        description: 'URL pública de la imagen',
        example: 'https://res.cloudinary.com/petora/image/upload/v1/productos/collar-antipulgas.jpg',
        format: 'uri',
        default: 'https://example.com',
    })
    @Column('text', {
        default: 'https://example.com'
    })
    url: string

    /** Producto al que pertenece la imagen. */
    @ApiProperty({
        description: 'Producto al que pertenece la imagen',
        type: () => Product,
    })
    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Relation<Product>

}