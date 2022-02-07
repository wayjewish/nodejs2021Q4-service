import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import fs from 'fs';
import { join } from 'path';
import { uploadDir } from './file.controller';
import { FastifyRequest, FastifyReply } from 'fastify';
import util from 'util';
import stream from 'stream';

@Injectable()
export class FileService {
  getFile(filename: string): StreamableFile {
    const filePath = join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException();
    }

    const file = fs.createReadStream(join(uploadDir, filename));
    return new StreamableFile(file);
  }

  async uploadFileFastify(
    req: FastifyRequest,
    res: FastifyReply<any>,
  ): Promise<any> {
    if (!req.isMultipart()) {
      throw new BadRequestException();
    }

    const data = await req.file();

    const pipeline = util.promisify(stream.pipeline);
    await pipeline(
      data.file,
      fs.createWriteStream(`${uploadDir}/${data.filename}`),
    );

    res.code(200).send({
      filename: data.filename,
    });
  }
}
