import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts.entity';
import { Images } from './images.entity';
import { Products } from './products.entity';
import { Users } from './users.entity';

@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'carts_products', synchronize: true })
export class Carts_Products {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'int', name: 'quantity' })
    quantity: number;

    @Column({ type: 'varchar', name: 'size' })
    size: string;

    @Column({ type: 'varchar', name: 'color' })
    color: string;

    // 다대일 연결(w/유저)
    @ManyToOne(() => Users, users => users.carts_products, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    users: Users[] | Users;

    // 다대일 연결(w/카트)
    @ManyToOne(() => Carts, carts => carts.carts_products, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'cartId', referencedColumnName: 'id' }])
    carts: Carts[] | Carts;

    // 다대일 연결(w/프로덕트)
    @ManyToOne(() => Products, products => products.carts_products, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;

    // 다대일 연결(w/이미지)
    @ManyToOne(() => Images, images => images.carts_products, {
        onDelete: 'CASCADE'
    })//조인 컬럼
    @JoinColumn([{ name: 'imageId', referencedColumnName: 'id' }])
    images: Images[] | Images;

}