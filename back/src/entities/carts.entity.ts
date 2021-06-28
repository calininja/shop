import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Carts_Products } from './carts_products.entity';
import { Products } from './products.entity';
import { Users } from './users.entity';

@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'carts', synchronize: true })
export class Carts {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt!: Date;

    @Column({ type: 'varchar', name: 'status', nullable: true })
    status: number | null;

    // 일대다 연결(w/카트프로덕트)
    @OneToMany(() => Carts_Products, carts_products => carts_products.carts, {
        cascade: true
    })
    carts_products: Carts_Products[] | Carts_Products;

    // 다대일 연결(w/유저)
    @ManyToOne(() => Users, users => users.carts, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    users: Users[] | Users;

    // 다대일 연결(w/프로덕트)
    @ManyToOne(() => Products, products => products.carts, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;

}