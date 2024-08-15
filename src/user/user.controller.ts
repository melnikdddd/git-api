import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RequestWithUser } from '../common/types/request';
import { UserService } from './user.service';
import { AddUserAddressDto } from './dto/add-user-address.dto';
import { getUserIdFromReq } from '../common/utils/request.utils';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async getMe(@Req() req: RequestWithUser) {
    const userId = req.user['sub'];
    return await this.userService.getUserById(userId);
  }

  @Post('add-address')
  @UseGuards(AccessTokenGuard)
  async addAddress(
    @Req() req: RequestWithUser,
    @Body() data: AddUserAddressDto,
  ) {
    const userId = getUserIdFromReq(req, req.user['sub']);
    return await this.userService.addAddress({ ...data, userId });
  }

  @Put('update-address/:id')
  @UseGuards(AccessTokenGuard)
  async updateAddress(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() data: AddUserAddressDto,
  ) {
    return await this.userService.updateAddress(id, { ...data });
  }

  @UseGuards(AccessTokenGuard)
  @Delete('delete-address/:id')
  async deleteAddress(@Param('id') id: string) {
    return await this.userService.deleteAddress(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('my-addresses')
  async getMyAddresses(@Req() req: RequestWithUser) {
    const userId = getUserIdFromReq(req, req.user['sub']);
    return await this.userService.getUserAddresses(userId);
  }
}
