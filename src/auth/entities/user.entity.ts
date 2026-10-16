
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Product } from "../../products/entities/product.entity.js";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    fullName: string

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text', {
        select: false
    })
    password: string

    @Column('bool', {
        default: true
    })
    isActive: boolean

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]

    //! Un usuario puede tener muchos productos
    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Relation<Product>


    @BeforeInsert()
    checkEmailBeforeInsert(){
        this.email = this.email.toLowerCase().trim()
    }


    @BeforeUpdate()
    checkEmailBeforeUpdate(){
        this.checkEmailBeforeInsert()
    }
}
