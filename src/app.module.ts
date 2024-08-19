import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { ProductModule } from './product/product.module';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';
import { OrdersModule } from './orders/orders.module';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.USER_TELEGRAM_BOT_KEY,
    }),
    TelegrafModule.forRoot({
      token: process.env.ADMIN_TELEGRAM_BOT_KEY,
    }),
    AuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DbModule,
    ProductModule,
    TelegramModule,
    StorageModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [StorageService],
})
export class AppModule {}
