import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
} from 'typeorm'

export abstract class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
