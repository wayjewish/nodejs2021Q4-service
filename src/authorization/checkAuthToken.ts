import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../common/customError';
import CONFIG from '../common/config';

const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) throw new CustomError(401, 'Wrong token');

        const token = req.headers.authorization.replace('Bearer ', '');
        jwt.verify(token, CONFIG.JWT_SECRET_KEY || 'secret-key', (err) => {
            if (err) throw new CustomError(401, 'Wrong token');

            next();
        });
    } catch (error) {
        res.status(401).send({ message: 'Not authorized to access this resource' });
    }



}

export default checkAuthToken;
