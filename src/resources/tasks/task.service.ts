import tasksRepo from './task.memory.repository';
import { ITask } from './task.types';

const getAll = () => tasksRepo.getAll();

const getOne = (id: string) => tasksRepo.getOne(id);

const create = (task: ITask) => tasksRepo.create(task);

const update = (id: string, props: ITask) => tasksRepo.update(id, props);

const remove = (id: string) => tasksRepo.remove(id);

const removeInBoards = (id: string) => tasksRepo.removeInBoards(id);

const resetUser = (id: string) => tasksRepo.resetUser(id);

export default { getAll, getOne, create, update, remove, removeInBoards, resetUser };
