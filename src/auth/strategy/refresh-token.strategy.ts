import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refresh_token = req.get('Cookie').replace('refresh_token', '').trim();
    return { ...payload, refresh_token };
  }
}
