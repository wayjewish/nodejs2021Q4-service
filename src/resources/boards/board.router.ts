import express, { Request, Response, NextFunction } from 'express';
import Board from './board.model';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router();

router.route('/').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const boards = await boardsService.getAll();

      res.status(200).json(boards.map(Board.toResponse));
      next();
    }
  )
);

router.route('/:id').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;

      const board = await boardsService.getOne(id);

      if (board) res.status(200).json(Board.toResponse(board));
      next();
    }
  )
);

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req;

      const newBoard = await boardsService.create(body);
    
      res.status(201).json(Board.toResponse(newBoard));
      next();
    }
  )
);

router.route('/:id').put(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      const {body} = req;
    
      const board = await boardsService.update(id, body);
    
      res.status(200).json(Board.toResponse(board));
      next();
    }
  )
);

router.route('/:id').delete(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      
      await tasksService.removeInBoards(id);
      await boardsService.remove(id);
    
      res.status(204).json();
      next();
    }
  )
);

export default router;
