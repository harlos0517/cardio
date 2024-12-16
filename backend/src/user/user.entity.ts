import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/base.entity'

@Entity()
export class User extends BaseEntity {
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
}
