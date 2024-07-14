import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ModeratorModule } from './moderator/moderator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DbModule,
    AdminModule,
    ModeratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
