import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts_Products } from './carts_products.entity';
import { Products } from './products.entity';

@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'images', synchronize: true })
export class Images {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'src' })
    src: string;

    // 다대일 연결(w/프로덕트)
    @ManyToOne(() => Products, products => products.images, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;

    // 일대다 연결(w/카트프로덕트)
    @OneToMany(() => Carts_Products, carts_products => carts_products.images, {
        cascade: true
    })
    carts_products: Carts_Products[] | Carts_Products;

}