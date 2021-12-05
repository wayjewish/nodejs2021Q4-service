const Router = require('koa-router');
const Task = require('./task.model');
const tasksService = require('./task.service');

const router = new Router({
	prefix: '/boards/:boardId/tasks'
});

router.get('/', async (ctx) => {
  const tasks = await tasksService.getAll();

  ctx.status = 200;
  ctx.body = tasks.map(Task.toResponse);
});

router.get('/:id', async (ctx) => {
  const {id} = ctx.params;
  const task = await tasksService.getOne(id);

  if (!task) {
    ctx.status = 404;
    ctx.body = 'Not found task';
    return;
  }

  ctx.status = 200;
  ctx.body = Task.toResponse(task);
});

router.post('/', async (ctx) => {
  const {body} = ctx.request;
  const task = new Task({
    ...body,
    boardId: ctx.params.boardId,
  });

  const newTask = await tasksService.create(task);

  ctx.status = 201;
  ctx.body = Task.toResponse(newTask);
});

router.put('/:id', async (ctx) => {
  const {id} = ctx.params;
  const {body} = ctx.request;

  const task = await tasksService.update(id, body);

  if (!task) {
    ctx.status = 404;
    ctx.body = 'Not found task';
    return;
  }

  ctx.status = 200;
  ctx.body = Task.toResponse(task);
});

router.delete('/:id', async (ctx) => {
  const {id} = ctx.params;
  
  await tasksService.remove(id);

  ctx.status = 204;
});

module.exports = router;
