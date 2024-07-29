import { Module } from '@nestjs/common';
import { UserTelegramService } from './user-telegram.service';
import { AdminTelegramService } from './admin-telegram.service';

@Module({
  providers: [],
})
export class TelegramModule {
  providers: [AdminTelegramService, UserTelegramService];
}
