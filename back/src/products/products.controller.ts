import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Get,
  ForbiddenException,
  Req,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import path from 'path';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from '../dto/product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/common/decorators/product.decorator';
import { diskStorage } from 'multer';
import { ImageDto } from 'src/dto/image.dto';
import { CategoryDto } from 'src/dto/category.dto';
import { ReviewDto } from 'src/dto/review.dto';
// import multerS3 from 'multer-s3';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3()

@ApiTags('PRODUCTS')
@Controller('api/product')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  // 카테고리 등록
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CategoryDto
  })
  @ApiOperation({ summary: '카테고리 등록' })
  @Post('category')
  async addCategory(@Req() data) {
    const result = await this.ProductsService.addCategory(data.body.category);
    return result;
  }

  // 카테고리 로드
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CategoryDto
  })
  @ApiOperation({ summary: '카테고리 로드' })
  @Get('category')
  async loadCategories(@Req() data) {
    return await this.ProductsService.loadCategories(data);
  }

  // 상품 등록
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ProductDto
  })
  @ApiOperation({ summary: '상품 등록' })
  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 20, {}))
  async addProduct(@UploadedFile() files, @Body() data: ProductDto) {
    const guard = this.ProductsService.findById(data.id);
    if (!guard) {
      throw new NotFoundException();
    }
    const result = await this.ProductsService.addProduct(
      data.id,
      data.title,
      data.content,
      data.image,
      data.size,
      data.color,
      data.price,
      data.categoryId
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }

  // 상품리스트 로드
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ProductDto
  })
  @ApiOperation({ summary: '상품리스트 로드' })
  @Get()
  async loadProducts(@Req() data) {
    // @Param() product?: ProductDto
    return await this.ProductsService.loadProducts(data);
  }

  // 이미지 등록
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ImageDto
  })
  @ApiOperation({ summary: '이미지 등록' })
  @Post('images')
  @UseInterceptors(FilesInterceptor('image', 20, {
    storage:
      // multerS3({
      //   s3: s3,
      //   bucket: 'calinode-s3',
      //   acl: 'public-read',
      //   key: function(req, file, cb) {
      //     cb(null, file.originalname)
      //   }
      // })
      diskStorage({
        destination: 'uploads'
        , filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const basename = path.basename(file.originalname, ext);
          cb(null, basename + new Date().valueOf() + ext)
        }
      })
  }))
  async addImages(@UploadedFile() files, @Req() data: ImageDto) {
    return await this.ProductsService.addImages(data);
  }

  // 리뷰 등록
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReviewDto
  })
  @ApiOperation({ summary: '리뷰 등록' })
  @Post('addReview')
  @UseInterceptors(FilesInterceptor('files[]', 20, {}))
  async addReview(@UploadedFile() files, @Req() req, @Body() data: ReviewDto) {
    const result = await this.ProductsService.addReview(
      data.id,
      data.star,
      data.comment,
      req.user.id,
      data.prdId,
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }
  // 리뷰 삭제
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CategoryDto
  })
  @ApiOperation({ summary: '리뷰 삭제' })
  @Delete('deleteReview/:id')
  async deleteReview(@Param() data) {
    return await this.ProductsService.deleteReview(data.id);
  }
  // 전체 리뷰 로드
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReviewDto
  })
  @ApiOperation({ summary: '전체 리뷰 로드' })
  @Get('loadReviews')
  async loadReviews(@Req() data: any) {
    return await this.ProductsService.loadReviews(
      data.query.prdId,
      data.query.offset
    );
  }

  // 카테고리 삭제
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CategoryDto
  })
  @ApiOperation({ summary: '카테고리 삭제' })
  @Delete('category/:id')
  async deleteCategory(@Param() data) {
    return await this.ProductsService.deleteCategory(data.id);
  }

  // 상품상세 로드
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ProductDto
  })
  @ApiOperation({ summary: '상품상세 로드' })
  @Get(':id')
  async loadProduct(@Product() product: ProductDto, @Param('id') id) {
    return await this.ProductsService.loadProduct(id);
  }

  // 상품 삭제
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ProductDto
  })
  @ApiOperation({ summary: '상품 삭제' })
  @Delete(':id')
  async deleteProducts(@Param() data) {
    return await this.ProductsService.deleteProducts(data.id);
  }

}

