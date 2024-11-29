import {
  Controller,
  Delete,
  Redirect,
  Res,
  Session,
} from '@nestjs/common'
import type { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  @Delete('logout')
  @Redirect()
  logout(@Session() session: Request['session'], @Res() res: Response) {
    new Promise((resolve, reject) => {
      session.destroy(reject)
      resolve(void 0)
    })
    res.clearCookie('connect.sid')
    return { url: '' }
  }
}
