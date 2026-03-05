import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCorsConfig } from './config/cors.config';
import { getValidationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const port = config.getOrThrow<number>('HTTP_PORT');

  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()))
  app.enableCors(getCorsConfig(config));
  await app.listen(port);
}
bootstrap();
