const Router = require('koa-router');
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

const router = new Router({
	prefix: '/users'
});

router.get('/', async (ctx) => {
  const users = await usersService.getAll();

  ctx.status = 200;
  ctx.body = users.map(User.toResponse);
});

router.get('/:id', async (ctx) => {
  const {id} = ctx.params;
  const user = await usersService.getOne(id);

  if (!user) {
    ctx.status = 404;
    ctx.body = 'Not found user';
    return;
  }

  ctx.status = 200;
  ctx.body = User.toResponse(user);
});

router.post('/', async (ctx) => {
  const {body} = ctx.request;
  const user = new User(body);
  const newUser = await usersService.create(user);

  ctx.status = 201;
  ctx.body = User.toResponse(newUser);
});

router.put('/:id', async (ctx) => {
  const {id} = ctx.params;
  const {body} = ctx.request;

  const user = await usersService.update(id, body);

  if (!user) {
    ctx.status = 404;
    ctx.body = 'Not found user';
    return;
  }

  ctx.status = 200;
  ctx.body = User.toResponse(user);
});

router.delete('/:id', async (ctx) => {
  const {id} = ctx.params;
  
  await usersService.remove(id);
  await tasksService.resetUser(id);

  ctx.status = 204;
});

module.exports = router;
