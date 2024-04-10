// src/common/decorators/validate-objective-access.decorator.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const idParam = this.reflector.get<string>('userIdParam', context.getHandler()) || 'user_id';
    request.params[idParam] = user.id;
    if (!user) {
      throw new UnauthorizedException('You do not have permission to access this resource.');
    }

    return true;
  }
}
