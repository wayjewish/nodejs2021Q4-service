import { getRepository } from "typeorm";
import Task from './task.model';
import { ITask } from './task.types';
import CustomError from '../../common/customError';

/**
 * get all tasks
 * @returns all tasks
 */
const getAll = async (): Promise<ITask[]> => {
  const taskRepository = getRepository(Task);

  const allTasks = await taskRepository.find()
  return allTasks;
};

/**
 * get task
 * @param id - id task
 * @returns task
 */
const getOne = async (id: string): Promise<ITask | undefined> => {
  const taskRepository = getRepository(Task);

  const foundTask = await taskRepository.findOne({ id });

  if (!foundTask) throw new CustomError(404, `The task with id ${id} was not found`);

  return foundTask;
};

/**
 * create task
 * @param task - object with task parameters
 * @returns created task
 */
const create = async (props: ITask): Promise<ITask> => {
  const taskRepository = getRepository(Task);

  const task = taskRepository.create(props);
  const newTask = await taskRepository.save(task);
  
  return newTask;
};

/**
 * update task
 * @param id - id task
 * @param props - object with new task parameters
 * @returns updated task
 */
const update = async (id: string, props: ITask): Promise<ITask> => {
  const taskRepository = getRepository(Task);

  const foundTask = await taskRepository.findOne({ id });

  if (!foundTask) throw new CustomError(404, `Could not update task with id ${id}`);

  const updateTask = await taskRepository.save({
    ...foundTask,
    ...props,
  });

  return updateTask;
};

/**
 * remove task
 * @param id - id task
 */
const remove = async (id: string): Promise<ITask> => {
  const taskRepository = getRepository(Task);

  const foundTask = await taskRepository.findOne({ id });

  if (!foundTask) throw new CustomError(404, `The user with id ${id} was not found`);

  const deleteTask = await taskRepository.remove(foundTask);

  return deleteTask;
};

/**
 * remove tasks in a remote board
 * @param boardId - id board
 */
const removeInBoards = async (boardId: string): Promise<void> => {
  const taskRepository = getRepository(Task);

  const foundTasks = await taskRepository.find({ boardId });
  
  if (foundTasks.length > 0) await taskRepository.remove(foundTasks);
};

/**
 * reset userId for tasks when deleting a user
 * @param userId - id user
 */
const resetUser = async (userId: string): Promise<void> => {
  const taskRepository = getRepository(Task);

  const foundTasks = await taskRepository.find({ userId });

  if (foundTasks.length > 0) {
    const newTasks = foundTasks.map(task => ({
      ...task,
      userId: null,
    }));

    console.log(newTasks);

    await taskRepository.save(newTasks);
  }
};


export default { getAll, getOne, create, update, remove, removeInBoards, resetUser };
