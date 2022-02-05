import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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
export class FileController {
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
