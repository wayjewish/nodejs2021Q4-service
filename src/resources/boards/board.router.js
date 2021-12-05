const Router = require('koa-router');
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const router = new Router({
	prefix: '/boards'
});

router.get('/', async (ctx) => {
  const boards = await boardsService.getAll();

  ctx.status = 200;
  ctx.body = boards.map(Board.toResponse);
});

router.get('/:id', async (ctx) => {
  const {id} = ctx.params;
  const board = await boardsService.getOne(id);

  if (!board) {
    ctx.status = 404;
    ctx.body = 'Not found board';
    return;
  }

  ctx.status = 200;
  ctx.body = Board.toResponse(board);
});

router.post('/', async (ctx) => {
  const {body} = ctx.request;
  const board = new Board(body);
  const newBoard = await boardsService.create(board);

  ctx.status = 201;
  ctx.body = Board.toResponse(newBoard);
});

router.put('/:id', async (ctx) => {
  const {id} = ctx.params;
  const {body} = ctx.request;

  const board = await boardsService.update(id, body);

  if (!board) {
    ctx.status = 404;
    ctx.body = 'Not found board';
    return;
  }

  ctx.status = 200;
  ctx.body = Board.toResponse(board);
});

router.delete('/:id', async (ctx) => {
  const {id} = ctx.params;
  
  await boardsService.remove(id);
  await tasksService.removeInBoards(id);

  ctx.status = 204;
});

module.exports = router;
