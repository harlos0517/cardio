import { Module } from '@nestjs/common'

import { DiscordAuthController } from '@/auth/discord/discord-auth.controller'

@Module({
  imports: [],
  controllers: [DiscordAuthController],
  providers: [],
})
export class DiscordAuthModule {}
