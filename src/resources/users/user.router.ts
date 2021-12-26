import express, { Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';
import tasksService from '../tasks/task.service';
import routerCatch from '../../utils/routerCatch';

const router = express.Router();

router.route('/').get(
  routerCatch(
    async (req: Request, res: Response) => {
      throw new Error('test');

      // eslint-disable-next-line no-unreachable
      const users = await usersService.getAll();

      res.status(200).json(users.map(User.toResponse));
    }
  )
);

router.route('/:id').get(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      
      const user = await usersService.getOne(id);
      
      if (user) res.status(200).json(User.toResponse(user));
    }
  )
);

router.route('/').post(
  routerCatch(
    async (req: Request, res: Response) => {
      const {body} = req;
      const user = new User(body);

      const newUser = await usersService.create(user);
    
      res.status(201).json(User.toResponse(newUser));
    }
  )
);

router.route('/:id').put(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const {body} = req;

      const user = await usersService.update(id, body);
    
      res.status(200).json(User.toResponse(user));
    }
  )
);

router.route('/:id').delete(
  routerCatch(
    async (req: Request, res: Response) => {
      const {id} = req.params;
      
      await usersService.remove(id);
      await tasksService.resetUser(id);
    
      res.status(204).json();
    }
  )
);

export default router;
