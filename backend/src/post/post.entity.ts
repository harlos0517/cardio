import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from '@/base.entity'
import { User } from '@/user/user.entity'

@Entity()
export class Post extends BaseEntity {
  @Column('text')
  content: string

  @ManyToOne(() => User)
  user: User

  @Column('int')
  userId: number
}
