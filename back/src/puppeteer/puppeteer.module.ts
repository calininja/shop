
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from '../entities/carts.entity';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { Carts_Products } from 'src/entities/carts_products.entity';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [PuppeteerController],
  providers: [PuppeteerService],
  exports: [PuppeteerService],
})
export class PuppeteerModule { }
