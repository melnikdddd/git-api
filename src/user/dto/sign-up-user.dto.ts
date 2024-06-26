import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  phone: string;

  @IsString()
  @MaxLength(20)
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}
