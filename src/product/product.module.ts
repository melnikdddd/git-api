import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  providers: [ProductService, AdminGuard],
  controllers: [ProductController],
})
export class ProductModule {}
