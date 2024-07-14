import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserDbService } from '../db/user.db.service';
import { hash } from '../common/utils/bcrypt.util';
import { User } from '.prisma/client';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens';
import * as process from 'process';
import { Roles } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private dbUser: UserDbService,
    private jwtService: JwtService,
  ) {}

  public async login(data: AuthUserDto): Promise<Tokens> {
    const { phone: phone_number, password } = data;
    const user: User = await this.dbUser.findOneByPhone(phone_number);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens: Tokens = await this.getTokens(
      user.id,
      user.phone_number,
      user.role,
    );
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  public async register(data: AuthUserDto): Promise<Tokens> {
    const { phone: phone_number, password } = data;

    if (await this.dbUser.findOneByPhone(phone_number)) {
      throw new ConflictException('Phone number already exists');
    }

    const hashPassword = await hash(password);

    const user: User = await this.dbUser.createOne({
      phone: phone_number,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user.id, user.phone_number, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  public async logout(userId: string) {
    return this.dbUser.updateOne(userId, { refresh_token: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.dbUser.findOneById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.phone_number, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, phone: string, role: Roles): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          phone,
          role,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '8h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          phone,
          role,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '90000',
        },
      ),
    ]);

    return {
      refresh_token,
      access_token,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.dbUser.updateOne(userId, {
      refresh_token: hashedRefreshToken,
    });
  }
}
