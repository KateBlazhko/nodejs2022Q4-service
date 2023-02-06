import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { PORT_NAME } from './constants/constants';
import { readFile } from 'node:fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('The REST Service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const file = await readFile('./doc/api.yaml', { encoding: 'utf8' });

  SwaggerModule.setup('doc', app, JSON.parse(file));

  await app.listen(PORT_NAME);
}
bootstrap();
