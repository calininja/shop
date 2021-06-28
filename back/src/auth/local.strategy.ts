import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'signinId', passwordField: 'password' });
  }

  async validate(signinId: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(signinId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null, user);
  }
}
