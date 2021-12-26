import { ErrorRequestHandler } from 'express';
import { errorLogger } from '../logger';

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('errorHandler');
    const { name, message, statusCode, stack } = err;
    const log = `${name} ${statusCode}: ${message}\n${stack}`;

    errorLogger.error(log);

    const status = statusCode || 500;
    res.status(status).send({ message });

    errorLogger.on('finish', () => {
        errorLogger.end();
        console.log('never reaches here');
        process.exit(1);
    });
};

export default errorHandler;
