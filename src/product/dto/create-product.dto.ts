import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductCategory } from '../types/category.types';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description?: string;

  @IsEnum(ProductCategory)
  categories: ProductCategory[];
}
