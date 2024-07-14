import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RefreshTokenStrategy } from '../common/strategy/refresh-token.strategy';
import { AccessTokenStrategy } from '../common/strategy/access-token.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenGuard,
    AccessTokenGuard,
    RefreshTokenStrategy,
    AccessTokenStrategy,
  ],
})
export class AuthModule {}
