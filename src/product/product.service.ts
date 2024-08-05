import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDbService } from '../db/product.db.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductService {
  constructor(private dbProduct: ProductDbService) {}

  public async createProduct(data: CreateProductDto): Promise<Product> {
    try {
      return await this.dbProduct.createOne(data);
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  public async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.dbProduct.updateOne(id, data);
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  public async deleteProduct(id: string): Promise<boolean> {
    try {
      return await this.dbProduct.deleteOne(id);
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }

  public async getProducts(params: GetProductsDto): Promise<Product[]> {
    try {
      return await this.dbProduct.getProducts(params);
    } catch (error) {
      throw new Error('Failed to get products');
    }
  }

  public async getOneProduct(id: string): Promise<Product> {
    try {
      return await this.dbProduct.findOneById(id);
    } catch (error) {
      throw new NotFoundException('Failed to get product');
    }
  }
}
