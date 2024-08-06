import { Inject, Injectable } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';

@Injectable()
export class OrderDbService {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  public async createOrder(
    data: CreateOrderDto,
    code: string,
    userId: string,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId,
        code,
        ...data,
      },
    });
  }

  public async findOneById(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  public async findAllOrdersByUserId(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  public async deleteOneById(id: string): Promise<Order | null> {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  public async updateOneById(data: UpdateOrderDto): Promise<Order | null> {
    const { id, ...rest } = data;
    return this.prisma.order.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }

  public async findOneByCode(code: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: {
        code,
      },
    });
  }
}
