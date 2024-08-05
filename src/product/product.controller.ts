import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { Product } from '@prisma/client';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(201)
  @Post('create')
  @UseGuards(AdminGuard)
  public async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(data);
  }

  @HttpCode(200)
  @Post('/:id/update')
  @UseGuards(AdminGuard)
  public async updateProduct(
    @Param('id') id: string,
    @Body() data: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, data);
  }

  @HttpCode(200)
  @Post('/:id/delete')
  @UseGuards(AdminGuard)
  public async deleteProduct(@Param('id') id: string): Promise<boolean> {
    return await this.productService.deleteProduct(id);
  }

  @HttpCode(200)
  @Get('/')
  public async getProducts(
    @Query() params: GetProductsDto,
  ): Promise<Product[]> {
    return await this.productService.getProducts(params);
  }

  @HttpCode(200)
  @Get('/:id')
  public async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.getOneProduct(id);
  }
}
