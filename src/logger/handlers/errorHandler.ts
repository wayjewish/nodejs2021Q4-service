import { ErrorRequestHandler } from 'express';
import { logger } from '../logger';

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { name, message, statusCode, stack } = err;
    const log = `${name} ${statusCode}: ${message}\n${stack}`;

    logger.error(log);

    if (statusCode) {
        res.status(statusCode).send({ message });
    } else {
        res.status(500).send({ message: 'Something wrong on server' });
    }
};

export default errorHandler;
