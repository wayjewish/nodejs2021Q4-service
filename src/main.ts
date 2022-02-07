import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fmp from 'fastify-multipart';
import { AppModule } from './app.module';

async function createApp() {
  if (process.env.USE_FASTIFY === 'true') {
    console.log('Fastify');

    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    app.register(fmp);
    app.enableCors();

    return app;
  }

  return await NestFactory.create<NestExpressApplication>(AppModule);
}

async function bootstrap() {
  const app = await createApp();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Trello Service')
    .setDescription(`Let's try to create a competitor for Trello!`)
    .setVersion('1.0.0')
    .addServer('/')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
