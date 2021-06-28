import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleAuthGuard } from 'src/auth-google/local-auth.guard';

@Controller('api/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) { }

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const test = await this.googleService.googleLogin(req);
    res.redirect('http://localhost:3060')
  }
}