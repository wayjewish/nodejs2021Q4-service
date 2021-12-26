import express, { Request, Response } from 'express';
import Board from './board.model';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router();

router.route('/').get(
  routerCatch(
    async (req: Request, res: Response) => {
      const boards = await boardsService.getAll();
      res.status(200).json(boards.map(Board.toResponse));
    }
  )
);

router.route('/:id').get(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const board = await boardsService.getOne(id);

      if (board) res.status(200).json(Board.toResponse(board));
    }
  )
);

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response) => {
      const {body} = req;
      const board = new Board(body);
      const newBoard = await boardsService.create(board);
    
      res.status(201).json(Board.toResponse(newBoard));
    }
  )
);

router.route('/:id').put(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const {body} = req;
    
      const board = await boardsService.update(id, body);
    
      res.status(200).json(Board.toResponse(board));
    }
  )
);

router.route('/:id').delete(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      
      await boardsService.remove(id);
      await tasksService.removeInBoards(id);
    
      res.status(204).json();
    }
  )
);

export default router;
