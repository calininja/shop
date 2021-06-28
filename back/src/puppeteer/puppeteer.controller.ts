import {
  Request,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Get,
  Response,
  ForbiddenException,
  Req,
  Res,
  UseInterceptors,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PuppeteerService } from './puppeteer.service';
import { Order } from 'src/common/decorators/order.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

// 요청, 응답에 대해서 알아요.
@ApiTags('PUPPETEER')
@Controller('api/puppeteer')
export class PuppeteerController {
  constructor(
    private readonly puppeteerService: PuppeteerService,
  ) { }

  @Get()
  async test() {
    return await this.puppeteerService.play()
  }




}

