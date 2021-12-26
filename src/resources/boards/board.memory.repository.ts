import { IBoard } from './board.types';
import CustomError from '../../common/customError';

let db: IBoard[] = [];

/**
 * get all boards
 * @returns all boards
 */
const getAll = async (): Promise<IBoard[]> => db;

/**
 * get board
 * @param id - id board
 * @returns board
 */
const getOne = async (id: string): Promise<IBoard | undefined> => {
  const foundBoard = db.find((board) => board.id === id);

  if (!foundBoard) throw new CustomError(404, `The board with id ${id} was not found`);

  return foundBoard;
};

/**
 * create board
 * @param board - object with board parameters
 * @returns created board
 */
const create = async (board: IBoard): Promise<IBoard> => {
  db.push({ ...board });
  return board;
};

/**
 * update board
 * @param id - id board
 * @param props - object with new board parameters
 * @returns updated board
 */
const update = async (id: string, props: IBoard): Promise<IBoard> => {
  const index = db.findIndex((p) => p.id === id);

  if (!db[index]) throw new CustomError(404, `Could not update board with id ${id}`);

  db[index] = { ...props};
  return db[index];
};

/**
 * remove board
 * @param id - id board
 */
const remove = async (id: string): Promise<void> => {
  db = db.filter((board) => board.id !== id);
};

export default { getAll, getOne, create, update, remove };
