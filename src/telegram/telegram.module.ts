import { Module } from '@nestjs/common';
import { UserTelegramService } from './user-telegram.service';
import { AdminTelegramService } from './admin-telegram.service';

@Module({
  providers: [AdminTelegramService, UserTelegramService],
})
export class TelegramModule {}
