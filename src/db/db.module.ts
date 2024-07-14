import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDbService } from './user.db.service';

@Global()
@Module({
  providers: [
    UserDbService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
  exports: [UserDbService],
})
export class DbModule {}
