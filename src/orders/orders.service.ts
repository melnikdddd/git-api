import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderDbService } from '../db/order.db.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateUniqueCode } from '../common/libs/nanoid';
import { ProductDbService } from '../db/product.db.service';
import { UserDbService } from '../db/user.db.service';
import { Order, Roles } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private dbOrder: OrderDbService,
    private dbProduct: ProductDbService,
    private dbUser: UserDbService,
  ) {}

  public async findOneByCode(
    code: string,
    userId: string,
    role: string,
  ): Promise<Order | null> {
    if (role === Roles.admin || role === Roles.moderator) {
      return this.dbOrder.findOneByCode(code);
    }
    const order: Order | null = await this.dbOrder.findOneByCode(code);
    if (!order) {
      return null;
    }
    if (order.userId !== userId) {
      throw new UnauthorizedException('Order not found');
    }

    return order;
  }

  public async createOrder(
    data: CreateOrderDto,
    userId: string,
  ): Promise<Order> {
    const { productId } = data;
    const user = await this.dbUser.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const product = await this.dbProduct.findOneById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const code = generateUniqueCode();

    return this.dbOrder.createOrder(data, code, userId);
  }

  public async findAllOrdersByUserId(userId: string): Promise<Order[]> {
    return this.dbOrder.findAllOrdersByUserId(userId);
  }

  public async findOneById(
    id: string,
    role: Roles,
    userId: string,
  ): Promise<Order | null> {
    if (role === Roles.admin || role === Roles.moderator) {
      return this.dbOrder.findOneById(id);
    }

    const order: Order | null = await this.dbOrder.findOneById(id);
    if (!order) {
      return null;
    }
    if (order.userId !== userId) {
      throw new UnauthorizedException('Order not found');
    }
    return order;
  }

  public async deleteOneById(id: string): Promise<Order | null> {
    return this.dbOrder.deleteOneById(id);
  }

  public async updateOneById(data: UpdateOrderDto): Promise<Order | null> {
    return this.dbOrder.updateOneById(data);
  }
}
