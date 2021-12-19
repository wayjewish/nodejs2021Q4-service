import express, { Request, Response } from 'express';
import Board from './board.model';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const {id} = req.params;
  const board = await boardsService.getOne(id);

  if (!board) res.status(404).json();
  if (board) res.status(200).json(Board.toResponse(board));
});

router.route('/').post(async (req: Request, res: Response) => {
  const {body} = req;
  const board = new Board(body);
  const newBoard = await boardsService.create(board);

  res.status(201).json(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  const board = await boardsService.update(id, body);

  if (!board) res.status(404).json();
  res.status(200).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const {id} = req.params;
  
  await boardsService.remove(id);
  await tasksService.removeInBoards(id);

  res.status(204).json();
});

export default router;
