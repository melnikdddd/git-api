import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Roles } from '@prisma/client';
import { AuthUserDto } from '../auth/dto/auth-user.dto';
import { User } from '.prisma/client';

@Injectable()
export class UserDbService {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  public async findOneById(id: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ? user : null;
  }

  public async findOneByPhone(phone: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        phone_number: phone,
      },
    });
    return user ? user : null;
  }

  public async createOne(data: AuthUserDto): Promise<User> {
    const { phone_number, password } = data;
    try {
      return await this.prisma.user.create({
        data: {
          phone_number,
          password,
        },
      });
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  public async createAdmin(data: AuthUserDto): Promise<User> {
    const { phone_number, password } = data;
    try {
      return await this.prisma.user.create({
        data: {
          phone_number,
          password,
          role: Roles.admin,
        },
      });
    } catch (error) {
      throw new Error('Failed to create admin');
    }
  }

  public async updateOne(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public async deleteOne(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
