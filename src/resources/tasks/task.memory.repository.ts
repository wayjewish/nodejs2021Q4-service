import { ITask } from './task.types';

let db: ITask[] = [];

const getAll = async () => db;

const getOne = async (id: string) => {
  const foundTask = db.find((task) => task.id === id);
  return foundTask;
};

const create = async (task: ITask) => {
  db.push(task);
  return task;
};

const update = async (id: string, props: ITask) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = { ...props };
  return db[index];
};

const remove = async (id: string) => {
  db = db.filter((task) => task.id !== id);
};

const removeInBoards = async (boardId: string) => {
  db = db.filter((task) => task.boardId !== boardId);
};

const resetUser = async (userId: string) => {
  db = db.map((task) =>
    (task.userId === userId)
    ? { ...task, userId: null }
    : { ...task }
  );
};


export default { getAll, getOne, create, update, remove, removeInBoards, resetUser };
