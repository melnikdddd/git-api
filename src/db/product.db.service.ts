import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { generateUniqueCode } from '../common/libs/nanoid';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { GetProductsDto } from '../product/dto/get-products.dto';

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

  public async findOneByCode(code: string): Promise<Product | null> {
    const product = this.prisma.product.findUnique({
      where: {
        code,
      },
    });
    return product ? product : null;
  }

  public async getProducts(params: GetProductsDto): Promise<Product[]> {
    const { take, page, search, sort, category, priceFrom, priceTo } = params;

    const skip = page > 0 ? (page - 1) * take : 0;

    const where: Prisma.ProductWhereInput = {
      AND: [
        { categories: { has: category } },
        { price: { gte: priceFrom, lte: priceTo } },
        {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        },
      ],
    };

    return this.prisma.product.findMany({
      where,
      orderBy: {
        price: sort === 'asc' ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
      },
      take,
      skip,
    });
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
