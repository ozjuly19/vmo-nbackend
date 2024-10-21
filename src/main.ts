import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  process.env.TZ = 'Etc/UTC'; // Set the timezone to UTC because if you don't database work becomes a nightmare

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Enable validation
  app.enableCors(); // Enable CORS
  await app.listen(3000);
}
bootstrap();
