
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Product } from "./product.entity.js";

@Entity({ name: 'products_images' })
export class ProductImage {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        default: 'https://example.com'
    })
    url: string

    //! relation N : 1
    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Relation<Product>

}