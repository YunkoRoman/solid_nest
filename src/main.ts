import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    })
    .setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  const version = process.env.npm_package_version || '0.0.1';

  const options = new DocumentBuilder()
    .setTitle('Bitoku API')
    .setDescription('Bitoku API')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const port = parseInt(process.env.PORT, 10) || 8080;

  await app.listen(port);
  Logger.log(
    `Application running in: ${process.env.NODE_ENV} mode 🚀`,
    `On Port: ${port}`,
    'Solid Nest API',
  );
}
bootstrap();
