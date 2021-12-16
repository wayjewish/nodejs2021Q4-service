import boardsRepo from './board.memory.repository';
import { IBoard } from './board.types';

const getAll = () => boardsRepo.getAll();

const getOne = (id: string) => boardsRepo.getOne(id);

const create = (board: IBoard) => boardsRepo.create(board);

const update = (id: string, props: IBoard) => boardsRepo.update(id, props);

const remove = (id: string) => boardsRepo.remove(id);

export default { getAll, getOne, create, update, remove };
