import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';


@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'sizes', synchronize: true })
export class Sizes {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'size' })
    size: string | null;

    @ManyToOne(() => Products, products => products.sizes, {
        onDelete: 'CASCADE'
    })

    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;



}