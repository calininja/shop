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
@Entity({ schema: 'shop', name: 'colors', synchronize: true })
export class Colors {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'color' })
    color: string | null;

    // 다대일 연결(w/프로덕트)
    @ManyToOne(() => Products, products => products.colors, {
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;



}