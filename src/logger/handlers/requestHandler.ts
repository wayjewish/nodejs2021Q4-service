import { Request, Response, NextFunction } from 'express';
import { requestLogger } from '../logger';

const requestHandler = (req: Request, res: Response, next: NextFunction) => {
    const query = Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : '';
    const body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
    const log = `${req.method} ${req.url}\nQuery: ${query}\nBody: ${body}\n`;

    requestLogger.debug(log);
    next();
};
  
export default requestHandler;
