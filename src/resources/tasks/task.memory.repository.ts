import { ITask } from './task.types';
import CustomError from '../../common/customError';

let db: ITask[] = [];

/**
 * get all tasks
 * @returns all tasks
 */
const getAll = async (): Promise<ITask[]> => db;

/**
 * get task
 * @param id - id task
 * @returns task
 */
const getOne = async (id: string): Promise<ITask | undefined> => {
  const foundTask = db.find((task) => task.id === id);

  if (!foundTask) throw new CustomError(404, `The task with id ${id} was not found`);

  return foundTask;
};

/**
 * create task
 * @param task - object with task parameters
 * @returns created task
 */
const create = async (task: ITask): Promise<ITask> => {
  db.push(task);
  return task;
};

/**
 * update task
 * @param id - id task
 * @param props - object with new task parameters
 * @returns updated task
 */
const update = async (id: string, props: ITask): Promise<ITask> => {
  const index = db.findIndex((p) => p.id === id);

  if (!db[index]) throw new CustomError(404, `Could not update task with id ${id}`);

  db[index] = { ...props };
  return db[index];
};

/**
 * remove task
 * @param id - id task
 */
const remove = async (id: string): Promise<void> => {
  db = db.filter((task) => task.id !== id);
};

/**
 * remove tasks in a remote board
 * @param boardId - id board
 */
const removeInBoards = async (boardId: string): Promise<void> => {
  db = db.filter((task) => task.boardId !== boardId);
};

/**
 * reset userId for tasks when deleting a user
 * @param userId - id user
 */
const resetUser = async (userId: string): Promise<void> => {
  db = db.map((task) =>
    (task.userId === userId)
    ? { ...task, userId: null }
    : { ...task }
  );
};


export default { getAll, getOne, create, update, remove, removeInBoards, resetUser };
