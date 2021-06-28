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
import { Images } from './images.entity';
import { Sizes } from './sizes.entity';
import { Colors } from './colors.entity';
import { Carts } from './carts.entity';
import { Categories } from './categories.entity';
import { Reviews } from './reviews.entity';

@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'products', synchronize: true })
export class Products {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'title' })
    title: string;

    @Column({ type: 'varchar', name: 'content' })
    content: string;

    @Column({ type: 'int', name: 'price' })
    price: number;

    // 일대다 연결(w/사이즈)
    @OneToMany(() => Sizes, sizes => sizes.products, {
        cascade: true
    })
    sizes: Sizes[] | Sizes;

    // 일대다 연결(w/이미지)
    @OneToMany(() => Images, images => images.products, {
        cascade: true
    })
    images: Images[] | Images;

    // 일대다 연결(w/컬러)
    @OneToMany(() => Colors, colors => colors.products, {
        cascade: true
    })
    colors: Colors[] | Colors;

    // 일대다 연결(w/카트프로덕트)
    @OneToMany(() => Carts_Products, carts_products => carts_products.products, {
        cascade: true
    })
    carts_products: Carts_Products[] | Carts_Products;

    // 일대다 연결(w/카트)
    @OneToMany(() => Carts, carts => carts.products, {
        cascade: true
    })
    carts: Carts[] | Carts;

    // 일대다 연결(w/리뷰)
    @OneToMany(() => Reviews, reviews => reviews.products, {
        cascade: true
    })
    reviews: Reviews[] | Reviews;

    // 다대일 연결(w/카테고리)
    @ManyToOne(() => Categories, categories => categories.products, {
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
    categories: Categories[] | Categories;

}