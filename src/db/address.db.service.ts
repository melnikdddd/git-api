import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, UserAddress } from '@prisma/client';
import { AddUserAddressDto } from '../user/dto/add-user-address.dto';
import { UpdateAddressDto } from '../user/dto/update-address.dto';

@Injectable()
export class AddressDbService {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  public async createOne(data: AddUserAddressDto): Promise<UserAddress> {
    return this.prisma.userAddress.create({
      data: {
        fistname: data.firstname,
        lastname: data.lastname,
        nova_post_department: data.nova_post_department
          ? data.nova_post_department
          : null,
        userId: data.userId,
        street: data.street,
        city: data.city,
      },
    });
  }

  public async deleteOne(id: string): Promise<UserAddress> {
    return this.prisma.userAddress.delete({
      where: {
        id,
      },
    });
  }

  public async updateOne(
    id: string,
    data: UpdateAddressDto,
  ): Promise<UserAddress> {
    return this.prisma.userAddress.update({
      where: {
        id,
      },
      data: { ...data },
    });
  }

  public async fineOneById(id: string): Promise<UserAddress | null> {
    return this.prisma.userAddress.findUnique({
      where: {
        id,
      },
    });
  }

  public async findAllByUserId(userId: string): Promise<UserAddress[]> {
    return this.prisma.userAddress.findMany({
      where: {
        userId,
      },
    });
  }

  public getAddressCountByUserId(userId: string): Promise<number> {
    return this.prisma.userAddress.count({
      where: {
        userId,
      },
    });
  }
}
