import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  phone: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
