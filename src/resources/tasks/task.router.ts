import express, { Request, Response, NextFunction } from 'express';
import Task from './task.model';
import tasksService from './task.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router({
  mergeParams: true,
});

router.route('/').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const tasks = await tasksService.getAll();

      res.status(200).json(tasks.map(Task.toResponse));
      next();
    }
  )
);

router.route('/:id').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;

      const task = await tasksService.getOne(id);
    
      if (task) res.status(200).json(Task.toResponse(task));
      next();
    }
  )
);

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req;
      const task = new Task({
        ...body,
        boardId: req.params.boardId,
      });

      const newTask = await tasksService.create(task);

      res.status(201).json(Task.toResponse(newTask));
      next();
    }
  )
);

router.route('/:id').put(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      const {body} = req;
    
      const task = await tasksService.update(id, body);
    
      res.status(200).json(Task.toResponse(task));
      next();
    }
  )
);

router.route('/:id').delete(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      
      await tasksService.remove(id);
    
      res.status(204).json();
      next();
    }
  )
);

export default router;
