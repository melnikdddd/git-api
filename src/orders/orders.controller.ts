import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RequestWithUser } from '../common/types/request';
import { AdminGuard } from '../common/guards/admin.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  private UserRoles: any;

  constructor(private ordersService: OrdersService) {}

  @HttpCode(201)
  @Post('create')
  @UseGuards(AccessTokenGuard)
  public async createOrder(
    @Body() data: CreateOrderDto,
    @Req() req: RequestWithUser,
  ): Promise<Order> {
    const userId = this.getUserId(req, data.userId);
    return this.ordersService.createOrder(data, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('all')
  public async findAllOrders(
    @Query('userId') id: string,
    @Req() req: RequestWithUser,
  ): Promise<Order[]> {
    const userId = this.getUserId(req, id);
    return this.ordersService.findAllOrdersByUserId(userId);
  }

  @Delete('delete')
  @UseGuards(AdminGuard)
  public async deleteOrder(@Query('id') id: string): Promise<Order> {
    return this.ordersService.deleteOneById(id);
  }

  @Put('update')
  @UseGuards(AdminGuard)
  public async updateOrder(@Body() data: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOneById(data);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  public async findOneById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    const userId = this.getUserId(req, req['user']['sub']);
    const role = req.user['role'];
    return this.ordersService.findOneById(id, role, userId);
  }

  @Get('code')
  @UseGuards(AccessTokenGuard)
  public async findOneByCode(
    @Query('code') code: string,
    @Req() req: RequestWithUser,
  ): Promise<Order> {
    const userId = this.getUserId(req, req['user']['sub']);
    const role = req.user['role'];
    return this.ordersService.findOneByCode(code, userId, role);
  }

  private getUserId(req: RequestWithUser, userId: string): string {
    const role = req.user['role'];
    if (role === this.UserRoles.ADMIN || role === this.UserRoles.MODERATOR) {
      return userId;
    }
    return req.user['sub'];
  }
}
