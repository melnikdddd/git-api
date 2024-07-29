import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ModeratorModule } from './moderator/moderator.module';
import { TelegramModule } from './telegram/telegram.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DbModule,
    ModeratorModule,
    ProductModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
