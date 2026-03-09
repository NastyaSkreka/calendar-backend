import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCorsConfig } from './config/cors.config';
import { getValidationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const port = process.env.PORT ? +process.env.PORT : 3000;

  app.enableCors(getCorsConfig(config));
  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  await app.listen(port);
}
bootstrap();
