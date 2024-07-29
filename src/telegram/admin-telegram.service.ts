import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { Telegraf } from 'telegraf';

@Injectable()
export class AdminTelegramService {
  private readonly apiKey = process.env.TELEGRAM_API_KEY;
  private readonly bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(this.apiKey);
  }
}
