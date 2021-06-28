import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';


@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'categories', synchronize: true })
export class Categories {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'name' })
    name: string | null;

    // 일대다 연결(w/카트)
    @OneToMany(() => Products, products => products.categories, {
        cascade: true
    })
    products: Products[] | Products;



}