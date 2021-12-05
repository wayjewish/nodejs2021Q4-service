const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const {id} = req.params;
  const user = await boardsService.getOne(id);
  res.status(200).json(Board.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const {body} = req;
  const user = new Board(body);
  const newUser = await boardsService.create(user);

  res.status(201).json(Board.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const {id} = req.params;
  const {body} = req;

  const user = await boardsService.update(id, body);

  res.status(200).json(Board.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const {id} = req.params;
  
  await boardsService.remove(id);

  res.status(204).json();
});

module.exports = router;
