import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Users } from './users.entity';

@Index('id', ['id'], { unique: true })
@Entity({ schema: 'shop', name: 'reviews', synchronize: true })
export class Reviews {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'star', nullable: true })
    star: string | null;

    @Column({ type: 'varchar', name: 'comment' })
    comment: string | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt!: Date;


    // 다대일 연결(w/유저)
    @ManyToOne(() => Users, users => users.reviews, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    users: Users[] | Users;

    // 다대일 연결(w/프로덕트)
    @ManyToOne(() => Products, products => products.reviews, {
        onDelete: 'CASCADE'
    })// 조인 컬럼
    @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
    products: Products[] | Products;

}