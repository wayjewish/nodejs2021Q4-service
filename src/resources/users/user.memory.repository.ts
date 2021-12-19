import { IUser } from './user.types';

let db: IUser[] = [];

/**
 * get all users
 * @returns all users
 */
const getAll = async (): Promise<IUser[]> => db;

/**
 * get user
 * @param id - id user
 * @returns user
 */
const getOne = async (id: string): Promise<IUser | undefined> => {
  const foundUser = db.find((user) => user.id === id);
  return foundUser;
};

/**
 * create user
 * @param user - object with user parameters
 * @returns created user
 */
const create = async (user: IUser): Promise<IUser> => {
  db.push(user);
  return user;
};

/**
 * update user
 * @param id - id user
 * @param props - object with new user parameters
 * @returns updated user
 */
const update = async (id: string, props: IUser): Promise<IUser> => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = { ...props };
  return db[index];
};

/**
 * remove user
 * @param id - id user
 */
const remove = async (id: string) => {
  db = db.filter((user) => user.id !== id);
};

export default { getAll, getOne, create, update, remove };
