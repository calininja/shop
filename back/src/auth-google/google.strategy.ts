import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly googleService: GoogleService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3065/api/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, refreshToken: string, profile: any,
    callback: (error: Error, user: any) => void,
  ) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0]?.value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0]?.value,
      accessToken
    }
    const result = await this.googleService.googleLogin(user);
    if (!result) {
      throw new UnauthorizedException();
    }
    callback(null, result);
    // done(null, result)
  }
}