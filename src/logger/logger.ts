

import * as path from 'path';
import { createLogger, format, transports } from 'winston';
import CONFIG from '../common/config';

const filenameRequest = path.resolve(path.join('logs', 'requests.log'));
const filenameError = path.resolve(path.join('logs', 'errors.log'));

const logger = createLogger({
    level: CONFIG.LOG_LEVEL ? CONFIG.LOG_LEVEL : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: filenameRequest, level: 'info' }),
        new transports.File({ filename: filenameError, level: 'error', handleExceptions: true, handleRejections: true }),
    ],
});

export {
    logger,
};