import { Module } from '@nestjs/common'

import { AuthController } from '@/auth/auth.controller'

import { DiscordAuthModule } from '@/auth/discord/discord-auth.module'

@Module({
  imports: [DiscordAuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
