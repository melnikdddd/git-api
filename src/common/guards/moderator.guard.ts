import { Roles } from '@prisma/client';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class ModeratorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];
    if (!token) return false;

    const payload: JwtPayload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    const role = payload.role;
    return role === Roles.moderator;
  }
}
