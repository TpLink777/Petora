
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { ProductImage } from './product-images.entity.js'

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        unique: true
    })
    title: string

    @Column('float', {
        default: 0
    })
    price: number

    @Column('text', {
        nullable: true
    })
    description: string

    @Column('text', {
        unique: true
    })
    slug: string

    @Column('int', {
        default: 0
    })
    stock?: number

    @Column('text')
    type: string


    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]


    //! relation 1 : N
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
        //! cascade: true permite que al guardar un producto, se guarden automáticamente sus imágenes relacionadas.
        //! eager: true permite que al consultar un producto, se traigan automáticamente sus imágenes relacionadas.
    )
    images: Relation<ProductImage>[]



    @BeforeInsert()
    checkSlug() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.normalizeSlug()
    }


    @BeforeUpdate()
    checkSlugBeforeUpdate() {
        this.normalizeSlug()
    }


    private normalizeSlug() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }
}
