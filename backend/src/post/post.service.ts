import { HttpException, Injectable } from '@nestjs/common'

import { Post } from './post.entity'

@Injectable()
export class PostService {
  async getPostInfo(postId: number) {
    const post = await Post.findOne({
      where: { id: postId },
      relations: ['user'],
    })
    if (!post) throw new HttpException('Post not found', 404)

    return await this.postConverter(post)
  }

  async getTimeline() {
    const posts = await Post.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    })

    return await Promise.all(posts.map(this.postConverter.bind(this)))
  }

  async createPost(userId: number, content: string) {
    const post = await Post.create({ userId, content }).save()
    return await this.postConverter(post)
  }

  private async postConverter(post: Post) {
    const { content, user, createdAt } = post
    return { username: user.username, content, createdAt: createdAt.toISOString() }
  }
}
