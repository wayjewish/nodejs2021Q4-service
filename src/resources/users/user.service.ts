import usersRepo from './user.memory.repository';
import { IUser } from './user.types';

const getAll = () => usersRepo.getAll();

const getOne = (id: string) => usersRepo.getOne(id);

const create = (user: IUser) => usersRepo.create(user);

const update = (id: string, props: IUser) => usersRepo.update(id, props);

const remove = (id: string) => usersRepo.remove(id);

export default { getAll, getOne, create, update, remove };
