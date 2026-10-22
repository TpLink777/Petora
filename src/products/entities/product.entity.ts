
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { ProductImage } from './product-images.entity.js'
import { User } from '../../auth/entities/user.entity.js'

/**
 * Entidad que representa un producto del catálogo.
 *
 * Se mapea a la tabla `products`. Cada producto pertenece a un usuario y puede
 * tener varias imágenes. El `slug` se genera a partir del título si no se
 * proporciona y se normaliza automáticamente antes de guardar.
 */
@Entity({ name: 'products' })
export class Product {

    /** Identificador único generado como UUID. */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** Título único del producto. */
    @Column('text', {
        unique: true
    })
    title: string

    /** Precio unitario; por defecto 0. */
    @Column('float', {
        default: 0
    })
    price: number

    /** Descripción opcional del producto. */
    @Column('text', {
        nullable: true
    })
    description: string

    /** Slug único usado en búsquedas y URLs amigables. */
    @Column('text', {
        unique: true
    })
    slug: string

    /** Unidades disponibles en inventario; por defecto 0. */
    @Column('int', {
        default: 0
    })
    stock?: number

    /** Categoría o tipo de producto (por ejemplo, `alimentos`, `juguetes`). */
    @Column('text')
    type: string


    /** Etiquetas para búsqueda y filtrado. */
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    /**
     * Relación 1:N con las imágenes del producto.
     * - `cascade: true`: al guardar el producto se guardan sus imágenes.
     * - `eager: true`: al consultar el producto se cargan sus imágenes.
     */
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images: Relation<ProductImage>[]

    /** Relación N:1: usuario que creó el producto. Se carga automáticamente. */
    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: Relation<User>


    /** Genera el slug a partir del título si no se envió, y lo normaliza. */
    @BeforeInsert()
    checkSlug() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.normalizeSlug()
    }

    /** Normaliza el slug antes de actualizar el producto. */
    @BeforeUpdate()
    checkSlugBeforeUpdate() {
        this.normalizeSlug()
    }

    /** Convierte el slug a minúsculas, reemplaza espacios por `_` y quita apóstrofes. */
    private normalizeSlug() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }
}
