import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDbService } from '../db/user.db.service';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RequestWithUser } from '../common/types/request';

@Controller('user')
export class UserController {
  constructor(private dbUser: UserDbService) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async getMe(@Req() req: RequestWithUser) {
    const userId = req.user['sub'];
    const user = await this.dbUser.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
