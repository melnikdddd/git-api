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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
