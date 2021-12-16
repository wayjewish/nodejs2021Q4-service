import express, { Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';
import tasksService from '../tasks/task.service';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await usersService.getOne(id);

  if (!user) res.status(404).json();
  if (user) res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req: Request, res: Response) => {
  const {body} = req;
  const user = new User(body);
  const newUser = await usersService.create(user);

  res.status(201).json(User.toResponse(newUser));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  const user = await usersService.update(id, body);

  if (!user) res.status(404).json();
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const {id} = req.params;
  
  await usersService.remove(id);
  await tasksService.resetUser(id);

  res.status(204).json();
});

export default router;
