import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Redirect,
  Req,
} from '@nestjs/common'
import axios from 'axios'
import type { Request } from 'express'

import {
  BACKEND_HOST,
  BACKEND_PORT,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  FRONTEND_HOST,
  FRONTEND_PORT,
  PROTOCOL,
} from '@/env.config'
import { User } from '@/user/user.entity'

const DISCORD_REDIRECT_URI =
  `${PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/auth/discord/callback`

@Controller('auth')
export class DiscordAuthController {
  @Get('discord')
  @Redirect()
  discordLogin() {
    const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize')
    discordAuthUrl.searchParams.append('client_id', DISCORD_CLIENT_ID)
    discordAuthUrl.searchParams.append('redirect_uri', DISCORD_REDIRECT_URI)
    discordAuthUrl.searchParams.append('response_type', 'code')
    discordAuthUrl.searchParams.append('scope', 'identify email')

    return { url: discordAuthUrl.toString() }
  }

  @Get('discord/callback')
  @Redirect()
  async discordCallback(@Query('code') code: string, @Req() req: Request) {
    try {
      const { data: tokenData } = await axios.post(
        'https://discord.com/api/oauth2/token',
        new URLSearchParams({
          client_id: DISCORD_CLIENT_ID,
          client_secret: DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: DISCORD_REDIRECT_URI,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )

      const { data: userData } = await axios.get(
        'https://discord.com/api/users/@me',
        { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
      )

      const { id, username, email } = userData
      const user = await User.findOneBy({ discordId: id }) || await User.findOneBy({ email })
      if (user) req.session.user = { id: user.id, username: user.username, email: user.email }
      else {
        const emailuser = await User.findOneBy({ email })
        if (emailuser) throw new HttpException('Email already in use', HttpStatus.CONFLICT)
        const usernameUser = await User.findOneBy({ username })
        const newUsername = usernameUser ? `${username}-${id}` : username
        const randomPassword = Math.random().toString(36).slice(-8)
        const newUser = await User.create({
          discordId: id,
          username: newUsername,
          email,
          encryptedPassword: randomPassword,
        }).save()
        req.session.user = { id: newUser.id, username: newUsername, email }
      }

      new Promise((resolve, reject) => {
        req.session.save(reject)
        resolve(void 0)
      })
      req.session.save(console.error)

      return { url: `${PROTOCOL}://${FRONTEND_HOST}:${FRONTEND_PORT}/user` }
    } catch (error) {
      console.error('Error during Discord OAuth:', error)
      throw new HttpException('Authentication Failed', HttpStatus.UNAUTHORIZED)
    }
  }
}
