import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Roles } from '@prisma/client';

type JwtPayload = {
  sub: string;
  phone: string;
  role: Roles;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['access_token'];
        }
        return token;
      },
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
