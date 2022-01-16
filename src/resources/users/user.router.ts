import express, { Request, Response, NextFunction } from 'express';
import User from './user.model';
import usersService from './user.service';
import tasksService from '../tasks/task.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router();

router.route('/').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await usersService.getAll();

      res.status(200).json(users.map(User.toResponse));
      next();
    }
  )
);

router.route('/:id').get(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      
      const user = await usersService.getOne(id);
      
      if (user) res.status(200).json(User.toResponse(user));
      next();
    }
  )
);

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {body} = req;
      
      const newUser = await usersService.create(body);
    
      res.status(201).json(User.toResponse(newUser));
      next();
    }
  )
);

router.route('/:id').put(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      const {body} = req;

      const user = await usersService.update(id, body);
    
      res.status(200).json(User.toResponse(user));
      next();
    }
  )
);

router.route('/:id').delete(
  routerCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      
      await tasksService.resetUser(id);
      await usersService.remove(id);
    
      res.status(204).json();
      next();
    }
  )
);

export default router;
