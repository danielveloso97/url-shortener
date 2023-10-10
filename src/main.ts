import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UrlModel } from './docs/models/url.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Url Shortener')
    .setDescription('Url Shortener API.')
    .setVersion('1.0')
    .addTag('URL')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [UrlModel],
  });
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
