const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const {id} = req.params;
  const board = await boardsService.getOne(id);

  if (!board) res.status(404).json();
  res.status(200).json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const {body} = req;
  const board = new Board(body);
  const newBoard = await boardsService.create(board);

  res.status(201).json(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req, res) => {
  const {id} = req.params;
  const {body} = req;

  const board = await boardsService.update(id, body);

  if (!board) res.status(404).json();
  res.status(200).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const {id} = req.params;
  
  await boardsService.remove(id);
  await tasksService.removeInBoards(id);

  res.status(204).json();
});

module.exports = router;
