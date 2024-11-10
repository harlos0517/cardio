import { NestFactory } from '@nestjs/core'
import 'reflect-metadata'

import '@/env.config'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.BACKEND_PORT ?? 6789)
}

bootstrap()
