import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductCategory } from '../types/category.types';

export class GetProductsDto {
  @IsNumber()
  readonly take: number;

  @IsNumber()
  readonly page: number;

  @IsString()
  readonly search: string;

  @IsString()
  readonly sort: string;

  @IsEnum(ProductCategory)
  readonly category: ProductCategory;

  @IsNumber()
  readonly priceFrom: number;

  @IsNumber()
  readonly priceTo: number;
}
