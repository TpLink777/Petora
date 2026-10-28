
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Product } from "../../products/entities/product.entity.js";
import { ValidRoles } from "../interfaces/valid-roles.interface.js";

/**
 * Entidad que representa a un usuario de Petora.
 *
 * Se mapea a la tabla `users`. Un usuario puede tener el rol `superAdmin`,
 * `admin` o `user`, y puede ser dueño de varios productos.
 */
@Entity('users')
export class User {

    /** Identificador único generado como UUID. */
    @ApiProperty({
        description: 'Identificador único del usuario',
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        format: 'uuid',
        readOnly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** Nombre completo del usuario. */
    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez',
    })
    @Column('text')
    fullName: string

    /** Correo electrónico único; se normaliza a minúsculas antes de guardar. */
    @ApiProperty({
        description: 'Correo electrónico único del usuario',
        example: 'juan.perez@example.com',
        format: 'email',
    })
    @Column('text', {
        unique: true
    })
    email: string

    /**
     * Contraseña hasheada con bcrypt.
     * `select: false` evita que se incluya en las consultas por defecto.
     */
    @ApiProperty({
        description: 'Contraseña del usuario. Se almacena hasheada con bcrypt y no se devuelve en las respuestas.',
        example: 'MiClave123!',
        writeOnly: true,
    })
    @Column('text', {
        select: false
    })
    password: string

    /** Indica si la cuenta está habilitada. Por defecto es `true`. */
    @ApiProperty({
        description: 'Indica si la cuenta del usuario está habilitada',
        example: true,
        default: true,
    })
    @Column('bool', {
        default: true
    })
    isActive: boolean

    /** Roles asignados al usuario. Por defecto, `['user']`. */
    @ApiProperty({
        description: 'Roles asignados al usuario',
        enum: ValidRoles,
        isArray: true,
        example: [ValidRoles.user],
        default: [ValidRoles.user],
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]

    /** Relación 1:N: productos creados por este usuario. */
    @ApiProperty({
        description: 'Productos creados por el usuario',
        type: () => [Product],
    })
    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Relation<Product>


    /** Normaliza el email antes de insertar un registro. */
    @BeforeInsert()
    checkEmailBeforeInsert(){
        this.email = this.email.toLowerCase().trim()
    }


    /** Vuelve a normalizar el email antes de actualizar un registro. */
    @BeforeUpdate()
    checkEmailBeforeUpdate(){
        this.checkEmailBeforeInsert()
    }
}
