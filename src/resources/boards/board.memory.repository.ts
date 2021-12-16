import { IBoard } from './board.types';

let db: IBoard[] = [];

const getAll = async () => db;

const getOne = async (id: string) => {
  const foundBoard = db.find((board) => board.id === id);
  return foundBoard;
};

const create = async (board: IBoard) => {
  db.push({ ...board });
  return board;
};

const update = async (id: string, props: IBoard) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = { ...props};
  return db[index];
};

const remove = async (id: string) => {
  db = db.filter((board) => board.id !== id);
};

export default { getAll, getOne, create, update, remove };
