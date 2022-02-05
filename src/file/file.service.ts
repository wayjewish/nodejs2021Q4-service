import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { uploadDir } from './file.controller';

@Injectable()
export class FileService {
  getFile(filename: string): StreamableFile {
    const filePath = join(uploadDir, filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException();
    }

    const file = createReadStream(join(uploadDir, filename));
    return new StreamableFile(file);
  }
}
