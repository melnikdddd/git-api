import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AdminGuard } from '../common/guards/admin.guard';
import { StorageModule } from '../storage/storage.module';

@Module({
  providers: [ProductService, AdminGuard],
  controllers: [ProductController],
  imports: [StorageModule],
})
export class ProductModule {}
