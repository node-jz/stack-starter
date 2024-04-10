// src/auth/google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

export type GoogleUser = {
  googleId: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
};
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env['SELF_URL']}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, id, photos } = profile;
    const user: GoogleUser = {
      googleId: id,
      email: emails[0].value,
      name: name.givenName,
      picture: photos[0].value,
      accessToken,
    };

    // Add or update the user in your database
    const userData = await this.authService.validateUser(user);
    done(null, userData);
  }
}
