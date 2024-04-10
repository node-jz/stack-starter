// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserEntityService } from 'src/entities/user.entity';
import { GoogleUser } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(private userEntityService: UserEntityService, private jwtService: JwtService) {}

  async validateUser(googleUser: GoogleUser): Promise<any> {
    return this.userEntityService.createOrReturnUser(googleUser);
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
