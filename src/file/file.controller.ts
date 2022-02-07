import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';

import { join } from 'path';
import multer from 'multer';

export const uploadDir = join(__dirname, '../../../upload');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

@ApiTags('file')
@Controller('file')
export class FileControllerExpress {
  constructor(private fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.getFile(filename);
  }
}

@ApiTags('file')
@Controller('file')
export class FileControllerFastify {
  constructor(private fileService: FileService) {}

  @Post()
  uploadFile(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    console.log('Fastify');
    return this.fileService.uploadFileFastify(req, res);
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.getFile(filename);
  }
}
