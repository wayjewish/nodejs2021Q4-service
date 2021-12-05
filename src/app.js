const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();
app.use(koaBody());

const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  if (ctx.request.url === '/') {
    ctx.body = 'Service is running!';
    return;
  }
  next();
});

app
  .use(router.routes())
  .use(userRouter.routes())
  .use(boardRouter.routes())
  .use(taskRouter.routes());

// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');
// const boardRouter = require('./resources/boards/board.router');
// const taskRouter = require('./resources/tasks/task.router');

// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
// app.use(express.json());
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

// app.use('/users', userRouter);
// app.use('/boards', boardRouter);
// app.use('/boards/:boardId/tasks', taskRouter);

module.exports = app;
