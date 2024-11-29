import { HttpException, Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UserService {
  async getUserInfo(userId: number) {
    const user = await User.findOneBy({ id: userId })
    if (!user) throw new HttpException('User not found', 404)

    const { email, username } = user
    return { email, username }
  }
}
