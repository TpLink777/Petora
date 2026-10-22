
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Product } from "../../products/entities/product.entity.js";

/**
 * Entidad que representa a un usuario de Petora.
 *
 * Se mapea a la tabla `users`. Un usuario puede tener el rol `superAdmin`,
 * `admin` o `user`, y puede ser dueño de varios productos.
 */
@Entity('users')
export class User {

    /** Identificador único generado como UUID. */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /** Nombre completo del usuario. */
    @Column('text')
    fullName: string

    /** Correo electrónico único; se normaliza a minúsculas antes de guardar. */
    @Column('text', {
        unique: true
    })
    email: string

    /**
     * Contraseña hasheada con bcrypt.
     * `select: false` evita que se incluya en las consultas por defecto.
     */
    @Column('text', {
        select: false
    })
    password: string

    /** Indica si la cuenta está habilitada. Por defecto es `true`. */
    @Column('bool', {
        default: true
    })
    isActive: boolean

    /** Roles asignados al usuario. Por defecto, `['user']`. */
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]

    /** Relación 1:N: productos creados por este usuario. */
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
