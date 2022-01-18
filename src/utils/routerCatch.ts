/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

const routerCatch = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};

export default routerCatch;