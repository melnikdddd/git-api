import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Includes } from '../../common/decorators/includes.decorator';
import { ProductCategory } from '../types/category.types';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @Includes(ProductCategory)
  categories?: string[];

  @IsBoolean()
  @IsOptional()
  is_available?: boolean;
}
