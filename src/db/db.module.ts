import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDbService } from './user.db.service';
import { ProductDbService } from './product.db.service';
import { OrderDbService } from './order.db.service';

@Global()
@Module({
  providers: [
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
    UserDbService,
    ProductDbService,
    OrderDbService,
  ],
  exports: [UserDbService, ProductDbService, OrderDbService],
})
export class DbModule {}
