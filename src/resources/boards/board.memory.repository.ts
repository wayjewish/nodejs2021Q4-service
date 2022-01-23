import { getRepository } from "typeorm";
import Board from './board.model';
import { IBoard } from './board.types';
import CustomError from '../../common/customError';

/**
 * get all boards
 * @returns all boards
 */
const getAll = async (): Promise<IBoard[]> => {
  const boardRepository = getRepository(Board);

  const allBoards = await boardRepository.find()
  return allBoards;
};
/**
 * get board
 * @param id - id board
 * @returns board
 */
const getOne = async (id: string): Promise<IBoard | undefined> => {
  const boardRepository = getRepository(Board);

  const foundBoard = await boardRepository.findOne({ id });

  if (!foundBoard) throw new CustomError(404, `The board with id ${id} was not found`);

  return foundBoard;
};

/**
 * create board
 * @param board - object with board parameters
 * @returns created board
 */
const create = async (props: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);

  const board = boardRepository.create(props);
  const newBoard = await boardRepository.save(board);
  
  return newBoard;
};

/**
 * update board
 * @param id - id board
 * @param props - object with new board parameters
 * @returns updated board
 */
const update = async (id: string, props: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);

  const foundBoard = await boardRepository.findOne({ id });

  if (!foundBoard) throw new CustomError(404, `Could not update board with id ${id}`);

  const updateBoard = await boardRepository.save({
    ...foundBoard,
    ...props,
  });

  return updateBoard;
};

/**
 * remove board
 * @param id - id board
 */
const remove = async (id: string): Promise<IBoard> => {
  const boardRepository = getRepository(Board);

  const foundBoard = await boardRepository.findOne({ id });

  if (!foundBoard) throw new CustomError(404, `The board with id ${id} was not found`);

  const deleteBoard = await boardRepository.remove(foundBoard);

  return deleteBoard;
};

export default { getAll, getOne, create, update, remove };
