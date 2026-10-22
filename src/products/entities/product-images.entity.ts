
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
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** URL pública de la imagen. */
    @Column('text', {
        default: 'https://example.com'
    })
    url: string

    /** Producto al que pertenece la imagen. */
    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Relation<Product>

}