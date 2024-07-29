import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { generateUniqueCode } from '../common/libs/nanoid';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
export class ProductDbService {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  public async findOneById(id: string): Promise<Product | null> {
    const product = this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product ? product : null;
  }

  public async createOne(data: CreateProductDto): Promise<Product> {
    const code: string = generateUniqueCode();
    return this.prisma.product.create({
      data: {
        ...data,
        code,
      },
    });
  }

  public async updateOne(id: string, data: UpdateProductDto): Promise<Product> {
    try {
      return this.prisma.product.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  public async deleteOne(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}
