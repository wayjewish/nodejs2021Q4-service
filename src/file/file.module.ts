import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import {
  FileControllerExpress,
  FileControllerFastify,
} from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [ConfigModule.forRoot(), MulterModule.register()],
  controllers: [
    process.env.USE_FASTIFY === 'true'
      ? FileControllerFastify
      : FileControllerExpress,
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
