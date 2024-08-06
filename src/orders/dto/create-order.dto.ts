import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  readonly userId?: string;

  @IsString()
  readonly productId: string;

  @IsNumber()
  readonly count: number;
}
