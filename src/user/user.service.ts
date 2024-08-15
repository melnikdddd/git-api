import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDbService } from '../db/user.db.service';
import { AddressDbService } from '../db/address.db.service';
import { AddUserAddressDto } from './dto/add-user-address.dto';
import { MAX_ADDRESS_COUNT } from '../common/constants/max-values.constant';
import { UserAddress } from '@prisma/client';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class UserService {
  constructor(
    private dbUser: UserDbService,
    private dbAddress: AddressDbService,
  ) {}

  public async getUserById(id: string) {
    const user = await this.dbUser.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async addAddress(data: AddUserAddressDto): Promise<UserAddress> {
    const addressCount = await this.dbAddress.getAddressCountByUserId(
      data.userId,
    );

    if (addressCount >= MAX_ADDRESS_COUNT) {
      throw new BadRequestException(
        'You have reached the maximum address count',
      );
    }

    return this.dbAddress.createOne(data);
  }

  public async updateAddress(
    id: string,
    data: UpdateAddressDto,
  ): Promise<UserAddress> {
    return await this.dbAddress.updateOne(id, data);
  }

  public async getUserAddresses(userId: string): Promise<UserAddress[]> {
    return await this.dbAddress.findAllByUserId(userId);
  }

  public async deleteAddress(id: string): Promise<UserAddress> {
    return await this.dbAddress.deleteOne(id);
  }

  public async getAddressById(id: string): Promise<UserAddress> {
    return await this.dbAddress.fineOneById(id);
  }
}
