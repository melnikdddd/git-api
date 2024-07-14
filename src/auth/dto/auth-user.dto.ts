import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @Matches(/^[0-9]{11}$/)
  readonly phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}