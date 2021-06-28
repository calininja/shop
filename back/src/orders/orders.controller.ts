import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseInterceptors,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../dto/order.dto';
import { OrdersService } from './orders.service';
import { Order } from 'src/common/decorators/order.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('ORDERS')
@Controller('api/order')
export class OrdersController {
  constructor(
    private readonly OrdersService: OrdersService,
  ) { }

  // 카트 등록
  @ApiResponse({
    status: 200,
    description: '성공',
    type: OrderDto
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 20, {}))
  async cartProduct(@Req() req, @Body() data: OrderDto) {
    return await this.OrdersService.addCart(
      data.id,
      data.color,
      data.size,
      data.quantity,
      req.user.id,
    );
  }
  // 카트 삭제
  @ApiResponse({
    status: 200,
    description: '성공',
    type: OrderDto
  })
  @ApiOperation({ summary: '카트 삭제' })
  @Delete(':id')
  async deleteProduct(@Param() data) {
    return await this.OrdersService.deleteCartItem(data.id);
  }

  // 카트 전체 삭제
  @ApiResponse({
    status: 200,
    description: '성공',
    type: OrderDto
  })
  @ApiOperation({ summary: '카트 전체 삭제' })
  @Post('deleteAll')
  async deleteProductsAll(@Req() req) {
    console.log(req.user.id, 'userId 비회원')
    return await this.OrdersService.deleteCartItemsAll(req.user.id);
  }
  // 카트 로드
  @ApiResponse({
    status: 200,
    description: '성공',
    type: OrderDto
  })
  @ApiOperation({ summary: '카트 로드' })
  @Get(':id')
  async loadCart(@Order() product: OrderDto, @Param('id') id) {
    return await this.OrdersService.loadCart(id);
  }

}

