import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { databaseConfig } from '@/database/database.config'

import { AuthModule } from '@/auth/auth.module'
import { PostModule } from '@/post/post.module'
import { UserModule } from '@/user/user.module'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
