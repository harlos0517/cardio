import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '@/user/user.entity'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  content: string

  @ManyToOne(() => User, user => user.posts)
  user: User
}
