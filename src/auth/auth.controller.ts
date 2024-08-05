import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Response } from 'express';
import { Tokens } from './types/tokens';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { RequestWithUser } from '../common/types/request';
import { ModeratorGuard } from '../common/guards/moderator.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() data: AuthUserDto, @Res() res: Response) {
    const tokens: Tokens = await this.authService.register(data);
    this.setCookies(res, tokens.access_token, tokens.refresh_token);
    res.status(201).send('success');
  }

  @Post('create-admin')
  @UseGuards(ModeratorGuard)
  public async createAdmin(@Body() data: AuthUserDto, @Res() res: Response) {
    const tokens: Tokens = await this.authService.registerAdmin(data);
    this.setCookies(res, tokens.access_token, tokens.refresh_token);
    res.status(201).send('success');
  }

  @Post('sign-in')
  public async signIn(@Body() data: AuthUserDto, @Res() res: Response) {
    const tokens: Tokens = await this.authService.login(data);
    this.setCookies(res, tokens.access_token, tokens.refresh_token);
    res.status(201).send('success');
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  public async refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refresh_token'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    this.setCookies(res, tokens.access_token, tokens.refresh_token);
    res.status(200).send('success');
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    await this.authService.logout(req.user['sub']);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).send('success');
  }

  private setCookies(
    res: Response,
    access_token: string,
    refresh_token: string,
  ): void {
    res.cookie('access_token', access_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
  }
}
