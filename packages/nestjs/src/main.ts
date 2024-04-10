import * as dotenv from 'dotenv';
import * as path from 'path';

import 'reflect-metadata';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
dotenv.config({ path: dotenv_path });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // This enables CORS for all origins
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
