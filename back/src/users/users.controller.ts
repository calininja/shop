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
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UserDto } from '../dto/user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';

// 요청, 응답에 대해서 알아요.
@ApiTags('USERS')
@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // 회원가입
  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const user = this.usersService.findById(data.signinId);
    if (!user) {
      throw new NotFoundException();
    }
    const result = await this.usersService.join(
      data.signinId,
      data.password,
    );
    if (result) {
      return 'ok';
    } else {
      throw new ForbiddenException();
    }
  }
  // 내 정보 조회
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto
  })
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(LoggedInGuard)
  @Get()
  async getUsers(@User() user) {
    return user
  }
  // 로그인
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@User() user) {
    return user;
  }
  // 로그아웃
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }

}

