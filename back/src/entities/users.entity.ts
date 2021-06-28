import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts.entity';
import { Carts_Products } from './carts_products.entity';
import { Reviews } from './reviews.entity';

@Index('signinId', ['signinId'], { unique: true })
@Entity({ schema: 'shop', name: 'users', synchronize: true })
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'signinId' })
    signinId: string;

    @Column({ type: 'varchar', name: 'password', select: false })
    password: string;

    // 일대다 연결(w/카트)
    @OneToMany(() => Carts, carts => carts.users, {
        cascade: true
    })
    carts: Carts[] | Carts;

    // 일대다 연결(w/리뷰)
    @OneToMany(() => Reviews, reviews => reviews.users, {
        cascade: true
    })
    reviews: Reviews[] | Reviews;

    // 일대다 연결(w/카트프로덕트)
    @OneToMany(() => Carts_Products, carts_products => carts_products.users, {
        cascade: true
    })
    carts_products: Carts_Products[] | Carts_Products;
}