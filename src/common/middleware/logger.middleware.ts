import {
  Injectable,
  NestMiddleware,
  Inject,
  Res,
  Req,
  Next,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl, query, body } = req;
      const { statusCode, statusMessage } = res;

      const queryString =
        query && Object.keys(query).length > 0 ? JSON.stringify(query) : '';
      const bodyString =
        body && Object.keys(body).length > 0 ? JSON.stringify(body) : '';

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${queryString} ${bodyString}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.info(message);
    });

    next();
  }
}
