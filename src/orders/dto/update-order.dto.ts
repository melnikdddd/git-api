import { OrderStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  readonly id: string;

  @IsString()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
