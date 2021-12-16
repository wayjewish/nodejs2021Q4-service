import { IUser } from './user.types';

let db: IUser[] = [];

const getAll = async () => db;

const getOne = async (id: string) => {
  const foundUser = db.find((user) => user.id === id);
  return foundUser;
};

const create = async (user: IUser) => {
  db.push(user);
  return user;
};

const update = async (id: string, props: IUser) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = { ...props };
  return db[index];
};

const remove = async (id: string) => {
  db = db.filter((user) => user.id !== id);
};

export default { getAll, getOne, create, update, remove };
