import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Post } from '@/post/post.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  email: string

  @Column('varchar', { length: 63 })
  username: string

  @Column('varchar')
  encryptedPassword: string

  @Column('varchar', { nullable: true })
  googleId: string

  @Column('varchar', { nullable: true })
  discordId: string

  @OneToMany(() => Post, post => post.user)
  posts: Post[]
}
