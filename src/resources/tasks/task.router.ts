import express, { Request, Response } from 'express';
import Task from './task.model';
import tasksService from './task.service';

const router = express.Router({
  mergeParams: true,
});

router.route('/').get(async (req: Request, res: Response) => {
  const tasks = await tasksService.getAll();
  res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const {id} = req.params;
  const task = await tasksService.getOne(id);

  if (!task) res.status(404).json();
  if (task) res.status(200).json(Task.toResponse(task));
});

router.route('/').post(async (req: Request, res: Response) => {
  const {body} = req;
  const task = new Task({
    ...body,
    boardId: req.params.boardId,
  });

  const newTask = await tasksService.create(task);

  res.status(201).json(Task.toResponse(newTask));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;

  const task = await tasksService.update(id, body);

  if (!task) res.status(404).json();
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const {id} = req.params;
  
  await tasksService.remove(id);

  res.status(204).json();
});

export default router;
