import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository, LessThan } from 'typeorm';
import { Products } from '../entities/products.entity';
import { Images } from 'src/entities/images.entity';
import { Sizes } from 'src/entities/sizes.entity';
import { Colors } from 'src/entities/colors.entity';
import { Categories } from 'src/entities/categories.entity';
import { Reviews } from 'src/entities/reviews.entity';
import { Users } from 'src/entities/users.entity';

// import AWS from 'aws-sdk';

// AWS.config.update({
//   "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
//   "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
//   "region": process.env.AWS_REGION
// })

// const s3 = new AWS.S3();

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
    @InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Images) private imagesRepository: Repository<Images>,
    @InjectRepository(Sizes) private sizesRepository: Repository<Sizes>,
    @InjectRepository(Colors) private colorsRepository: Repository<Colors>,
    @InjectRepository(Reviews) private reviewsRepository: Repository<Reviews>,
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) { }

  // 카테고리 등록
  async addCategory(name: string) {
    const guard = await this.categoriesRepository.findOne({ where: { name } });
    if (guard) {
      return '카테고리가 존재 합니다.'
    }
    const category = new Categories();
    category.name = name;
    await this.categoriesRepository.save(category);
    return true;
  }
  // 카테고리 삭제
  async deleteCategory(id: number) {
    const guard = await this.categoriesRepository.findOne({ id: id });
    if (!guard) {
      return '해당 카테고리가 존재하지 않습니다.';
    }
    await getRepository(Categories)
      .createQueryBuilder()
      .delete()
      .from(Categories)
      .where('id = :id', { id: id })
      .execute();
    return '카테고리 삭제 완료!';
  }
  // 카테고리별 로드
  async loadCategories(data) {
    let whereLastId = {}
    if (data.query.lastId != 0) {
      whereLastId = {
        id: LessThan(data.query.lastId),
      }
    } else {
      whereLastId = {
      }
    }
    const result = await getRepository(Products)
      .createQueryBuilder('products')
      .where(whereLastId)
      .andWhere('categories.id = :id2', { id2: data.query.categoryId })
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.colors', 'colors')
      .orderBy("products.id", "DESC")
      .take(20)
      .getMany()

    return result;
  }

  // 상품 가드
  async findById(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      select: ['title', 'content'],
    });
  }
  // 상품 등록
  async addProduct(id: number, title: string, content: string, image: string, size: string, color: string, price: number, categoryId: string) {

    const guard = await this.productsRepository.findOne({ where: { id } });

    if (guard) return false;

    const categories = await getRepository(Categories)
      .createQueryBuilder('categories')
      .where('categories.name = :name', { name: categoryId })
      .getOne()

    if (!categories) return false;

    // 상품 등록
    const products = new Products();
    products.categories = categories;
    products.title = title;
    products.content = content;
    products.price = price;
    await this.productsRepository.save(products);

    // 컬러 등록
    const splittedColor = color.split(',');
    for (let i = 0; i < splittedColor.length; i++) {
      const colors = new Colors();
      colors.color = color.split(',')[i];
      colors.products = products;
      await this.colorsRepository.save(colors);
    }

    // 사이즈 등록
    const splittedSize = size.split(',');
    for (let i = 0; i < splittedSize.length; i++) {
      const sizes = new Sizes();
      sizes.size = size.split(',')[i];
      sizes.products = products;
      await this.sizesRepository.save(sizes);
    }
    // 이미지 등록
    if (Array.isArray(image)) {
      for (let i = 0; i < image.length; i++) {
        const images = new Images();
        images.src = image[i];
        images.products = products;
        await this.imagesRepository.save(images);
      }
      return true;
    } else {
      const images = new Images();
      images.src = image;
      images.products = products;
      await this.imagesRepository.save(images);
      return true;
    }
  }
  // 상품 삭제
  async deleteProducts(id) {
    const guard = await this.productsRepository.findOne({ id: id });
    if (!guard) {
      return '해당 게시글이 존재하지 않습니다.';
    }
    await getRepository(Products)
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where('id = :id', { id: id })
      .execute();
    return '게시글 삭제 완료!';
  }
  // 상품 리스트 로드
  async loadProducts(data) {
    let where = {};
    if (data.query.lastId != 0) {
      where = {
        id: LessThan(data.query.lastId)
      };
    } else {
      where = {
      }
    }
    const result = await this.productsRepository.find({
      relations: ['images', 'colors', 'categories'],
      where,
      order: {
        id: 'DESC'
      },
      take: 20,
    });
    return result;
  }
  // 상품 디테일 로드
  async loadProduct(id: number) {
    const result = await this.productsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['sizes', 'images', 'colors'],
      order: {
        id: 'ASC',
      }
    });
    return result;
  }
  // 이미지 추가
  async addImages(req: any) {
    return req.files.map(v => v.filename);
    // return req.files.map(v => v.location);
  }
  // 리뷰 등록
  async addReview(id: number, star: string, comment: string, userId: number, prdId: string) {

    const guard = await this.reviewsRepository.findOne({ where: { id } });
    if (guard) {
      return false;
    }
    // 유저 id 찾기
    const users = await getRepository(Users)
      .createQueryBuilder('users')
      .where('users.id = :id', { id: userId })
      .getOne()

    // 상품 id 찾기
    const products = await getRepository(Products)
      .createQueryBuilder('products')
      .where('products.id = :id', { id: prdId })
      .getOne()
    const review = new Reviews();
    review.users = users;
    review.products = products;
    review.star = star;
    review.comment = comment;
    await this.reviewsRepository.save(review);
    return true;
  }
  // 전체 리뷰 로드
  async loadReviews(prdId: number, offset: number) {

    const allReviews = await getRepository(Reviews)
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.users', 'users')
      .leftJoinAndSelect('reviews.products', 'products')
      .where('reviews.productId = :productId', { productId: prdId })
      .getMany()

    const result = await getRepository(Reviews)
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.users', 'users')
      .leftJoinAndSelect('reviews.products', 'products')
      .where('reviews.productId = :productId', { productId: prdId })
      .take(10)
      .skip(offset)
      .orderBy('reviews.id', 'DESC')
      .getMany()

    return { result, allReviews };
  }
  // 리뷰 삭제
  async deleteReview(id) {
    const guard = await this.reviewsRepository.findOne({ id: id });
    if (!guard) {
      return '해당 게시글이 존재하지 않습니다.';
    }
    await getRepository(Reviews)
      .createQueryBuilder()
      .delete()
      .from(Reviews)
      .where('id = :id', { id: id })
      .execute();
    return '게시글 삭제 완료!';
  }
}
