import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDbService } from './user.db.service';
import { ProductDbService } from './product.db.service';
import { OrderDbService } from './order.db.service';
import { AddressDbService } from './address.db.service';

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
    AddressDbService,
  ],
  exports: [UserDbService, ProductDbService, OrderDbService, AddressDbService],
})
export class DbModule {}
