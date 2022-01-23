import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import './typeorm/createConnection';

import errorHandler from './logger/handlers/errorHandler';
import loggerHandler from './logger/handlers/requestHandler';

import loginRouter from './resources/login/login.router';
import checkAuthToken from './authorization/checkAuthToken';

import userRouter  from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(checkAuthToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(loggerHandler);

app.use(errorHandler);

// throw Error('Oops!');
// Promise.reject(Error('Oops! Promise!'));

export default app;
