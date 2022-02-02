import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CONFIG.PORT || 4000);
}
bootstrap();
