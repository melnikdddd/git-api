import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { Context, Markup, Telegraf } from 'telegraf';
import { On, Start } from 'nestjs-telegraf';
import { UserDbService } from '../db/user.db.service';
import { Roles } from '@prisma/client';

@Injectable()
export class AdminTelegramService {
  private readonly apiKey = process.env.ADMIN_TELEGRAM_BOT_KEY;
  private readonly bot: Telegraf;

  constructor(private dbUser: UserDbService) {
    this.bot = new Telegraf(this.apiKey);
  }

  public async sendMessage(chatId: string, message: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, message);
  }

  @Start()
  async start(ctx: Context) {
    console.log('start');
    await ctx.reply(
      'Привет, нажми на кнопку для авторизации',
      Markup.keyboard([Markup.button.contactRequest('Войти')]).resize(),
    );
  }

  @On('contact')
  async onContact(ctx: Context) {
    await ctx.reply('Идет проверка...');
    const contact = ctx.message['contact'];
    if (!contact) {
      return ctx.reply('Пожалуйста, отправьте номер телефона');
    }
    const phone = contact['phone_number'];
    const user = await this.dbUser.findOneByPhone(phone);

    if (!user || user.role === Roles.user) {
      return ctx.reply('У вас нет прав на использование бота');
    }
    const telegramInfo = await this.dbUser.getUserTelegramInfoByUserId(user.id);

    if (telegramInfo) {
      return ctx.reply('Авторизация успешна. Добро пожаловать');
    }

    await this.dbUser.addTelegramInfo(user, ctx.chat.id.toString());

    return ctx.reply('Регистрация прошла успешно. Добро пожаловать');
  }
}
