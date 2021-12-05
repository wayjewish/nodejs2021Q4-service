const router = require('express').Router({
  mergeParams: true,
});
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const {id} = req.params;
  const task = await tasksService.getOne(id);
  res.status(200).json(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const {body} = req;
  const task = new Task(body);
  const newTask = await tasksService.create(task);

  res.status(201).json(Task.toResponse(newTask));
});

router.route('/:id').put(async (req, res) => {
  const {id} = req.params;
  const {body} = req;

  const task = await tasksService.update(id, body);

  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  const {id} = req.params;
  
  await tasksService.remove(id);

  res.status(204).json();
});

module.exports = router;
