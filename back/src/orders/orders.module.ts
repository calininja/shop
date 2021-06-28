
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from '../entities/carts.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Carts_Products } from 'src/entities/carts_products.entity';
import { Products } from 'src/entities/products.entity';
import { Images } from 'src/entities/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carts, Carts_Products, Products, Images]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule { }
