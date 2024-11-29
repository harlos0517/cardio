import { Controller, Get, HttpException, Req } from '@nestjs/common'
import type { Request } from 'express'

import { UserService } from '@/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const sessionUser = req.session.user
    if (!sessionUser) throw new HttpException('Unauthorized', 401)

    return await this.userService.getUserInfo(sessionUser.id)
  }
}
