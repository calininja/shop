import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Carts } from '../entities/carts.entity';
import { Carts_Products } from 'src/entities/carts_products.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Images } from 'src/entities/images.entity';

// 요청, 응답에 대해서 몰라요.
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Carts) private cartsRepository: Repository<Carts>,
    @InjectRepository(Carts_Products) private carts_productsRepository: Repository<Carts_Products>,
  ) { }

  // 장바구니 추가
  async addCart(id: string | Blob, color: string, size: string, quantity: string, userId: number) {

    // 유저 id 찾기
    const users = await getRepository(Users)
      .createQueryBuilder('users')
      .where('users.id = :id', { id: userId })
      .getOne()

    // 카트 id 찾기
    const products = await getRepository(Products)
      .createQueryBuilder('carts')
      .where('carts.id = :id', { id: id })
      .getOne()

    // 이미지 id 찾기
    const images = await getRepository(Images)
      .createQueryBuilder('images')
      .where('images.productId = :id', { id: id })
      .getOne()

    // 동일상품 체크
    const cartsProductsValid = await getRepository(Carts_Products)
      .createQueryBuilder('carts_products')
      .where('carts_products.userId = :userId', { userId: userId })
      .andWhere('carts_products.productId = :productId', { productId: id })
      .andWhere('carts_products.size = :size', { size: size })
      .andWhere('carts_products.color = :color', { color: color })
      .andWhere('carts_products.quantity = :quantity', { quantity: quantity })
      .getOne()

    // 동일상품 체크
    if (cartsProductsValid) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // 동일상품 수량업데이트 체크
    const cartsProductsId = await getRepository(Carts_Products)
      .createQueryBuilder('carts_products')
      .where('carts_products.productId = :id', { id: id })
      .andWhere('carts_products.size = :size', { size: size })
      .andWhere('carts_products.color = :color', { color: color })
      .getOne()

    // 동일상품 수량업데이트 체크
    if (
      cartsProductsId
      && cartsProductsId?.quantity != +quantity
    ) {
      await getRepository(Carts_Products)
        .createQueryBuilder('carts_products')
        .where('carts_products.productId = :id', { id: id })
        .andWhere('carts_products.size = :size', { size: size })
        .andWhere('carts_products.color = :color', { color: color })
        .update(Carts_Products)
        .set({
          quantity: +quantity
        })
        .execute()
      return true;
    }

    // 카트 데이터 저장
    const carts = new Carts();
    carts.users = users;
    carts.products = products;
    await this.cartsRepository.save(carts);

    // 카트 프로덕트 데이터 저장
    const carts_products = new Carts_Products();
    carts_products.users = users; // 유저 외래키
    carts_products.carts = carts; // 카트 외래키
    carts_products.products = products; // 프로덕트 외래키
    carts_products.images = images; // 이미지 외래키
    carts_products.color = color;
    carts_products.size = size;
    carts_products.quantity = +quantity;
    await this.carts_productsRepository.save(carts_products);

  }

  // 장바구니 삭제
  async deleteCartItem(id: number) {
    const guard = await this.cartsRepository.findOne({ id: id });
    if (!guard) {
      return '해당 게시글이 존재하지 않습니다.';
    }
    await getRepository(Carts)
      .createQueryBuilder()
      .delete()
      .from(Carts)
      .where('id = :id', { id: id })
      .execute();
    return '게시글 삭제 완료!';
  }

  // 장바구니 전체 삭제
  async deleteCartItemsAll(id: number) {
    await getRepository(Carts)
      .createQueryBuilder()
      .delete()
      .from(Carts)
      .where('carts.userId = :id', { id: id })
      .execute();
    return '게시글 전체 삭제 완료!';
  }

  // 장바구니 로드
  async loadCart(id: number) {
    const result = await getRepository(Carts_Products)
      .createQueryBuilder('carts_products')
      .where('carts.userId = :id', { id: id })
      .leftJoinAndSelect('carts_products.carts', 'carts')
      .leftJoinAndSelect('carts_products.products', 'products')
      .leftJoinAndSelect('carts_products.images', 'images')
      .getMany()
    return result;
  }

}
