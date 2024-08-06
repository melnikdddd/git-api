import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AccessTokenGuard } from '../common/guards/access-token.guard';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [AccessTokenGuard],
})
export class OrdersModule {}
