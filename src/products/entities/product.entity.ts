
import { ApiProperty } from '@nestjs/swagger'
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
    @ApiProperty({
        description: 'Identificador único del producto',
        example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        format: 'uuid',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** Título único del producto. */
    @ApiProperty({
        description: 'Título único del producto',
        example: 'Collar antipulgas para perro',
    })
    @Column('text', {
        unique: true
    })
    title: string

    /** Precio unitario; por defecto 0. */
    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 49.99,
        default: 0,
        minimum: 0,
    })
    @Column('float', {
        default: 0
    })
    price: number

    /** Descripción opcional del producto. */
    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Collar ajustable con tratamiento antipulgas para perros de raza mediana.',
        required: false,
        nullable: true,
    })
    @Column('text', {
        nullable: true
    })
    description: string

    /** Slug único usado en búsquedas y URLs amigables. */
    @ApiProperty({
        description: 'Slug único usado en búsquedas y URLs amigables. Si se omite, se genera a partir del título.',
        example: 'collar_antipulgas_para_perro',
    })
    @Column('text', {
        unique: true
    })
    slug: string

    /** Unidades disponibles en inventario; por defecto 0. */
    @ApiProperty({
        description: 'Unidades disponibles en inventario',
        example: 25,
        default: 0,
        minimum: 0,
        required: false,
    })
    @Column('int', {
        default: 0
    })
    stock?: number

    /** Categoría o tipo de producto (por ejemplo, `alimentos`, `juguetes`). */
    @ApiProperty({
        description: 'Categoría o tipo de producto',
        example: 'accesorios',
    })
    @Column('text')
    type: string


    /** Etiquetas para búsqueda y filtrado. */
    @ApiProperty({
        description: 'Etiquetas para búsqueda y filtrado del producto',
        example: ['perros', 'antipulgas'],
        type: [String],
        default: [],
    })
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
    @ApiProperty({
        description: 'Imágenes asociadas al producto',
        type: () => [ProductImage],
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images: Relation<ProductImage>[]

    /** Relación N:1: usuario que creó el producto. Se carga automáticamente. */
    @ApiProperty({
        description: 'Usuario que creó el producto',
        type: () => User,
    })
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
