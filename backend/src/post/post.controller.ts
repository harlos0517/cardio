import { Controller, Get, HttpException, Param, Post, Req } from '@nestjs/common'
import type { Request } from 'express'

import { PostService } from '@/post/post.service'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getMe(@Req() req: Request, @Param('id') id: string) {
    const sessionUser = req.session.user
    if (!sessionUser) throw new HttpException('Unauthorized', 401)

    const postId = parseInt(id)
    if (isNaN(postId)) throw new HttpException('Invalid post ID', 400)

    return await this.postService.getPostInfo(postId)
  }

  @Get('timeline')
  async getTimeline(@Req() req: Request) {
    const sessionUser = req.session.user
    if (!sessionUser) throw new HttpException('Unauthorized', 401)

    return await this.postService.getTimeline()
  }

  @Post('create')
  async createPost(@Req() req: Request) {
    const sessionUser = req.session.user
    if (!sessionUser) throw new HttpException('Unauthorized', 401)

    const { content } = req.body
    if (!content) throw new HttpException('Content is required', 400)

    return await this.postService.createPost(sessionUser.id, content)
  }
}
