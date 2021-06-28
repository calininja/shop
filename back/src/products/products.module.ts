
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Images } from 'src/entities/images.entity';
import { Sizes } from 'src/entities/sizes.entity';
import { Colors } from 'src/entities/colors.entity';
import { Carts } from 'src/entities/carts.entity';
import { Categories } from 'src/entities/categories.entity';
import { Reviews } from 'src/entities/reviews.entity';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products, Images, Sizes, Colors, Carts, Reviews, Users]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }
