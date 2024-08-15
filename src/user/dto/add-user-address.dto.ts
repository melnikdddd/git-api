import { IsOptional, IsString, IsUUID } from 'class-validator';

export class AddUserAddressDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly userId?: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly street: string;

  @IsString()
  readonly nova_post_department: number;
}
