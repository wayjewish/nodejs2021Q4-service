import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';

const requestHandler = (req: Request, res: Response, next: NextFunction) => {
    const query = Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : '';
    const body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
    const log = `${req.method} ${req.url}\nStatusCode: ${res.statusCode}\nQuery: ${query}\nBody: ${body}\n`;

    logger.info(log);
    next();
};
  
export default requestHandler;
