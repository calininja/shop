import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PuppeteerService } from './puppeteer.service';

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

