import { NestFactory } from '@nestjs/core'
import 'reflect-metadata'

import { AppModule } from '@/app.module'
import session from '@/redis/session.config'

import { BACKEND_PORT, FRONTEND_HOST, FRONTEND_PORT, PROTOCOL } from '@/env.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: `${PROTOCOL}://${FRONTEND_HOST}:${FRONTEND_PORT}`,
    credentials: true,
  })
  app.use(await session())
  await app.listen(BACKEND_PORT)
}

bootstrap()
