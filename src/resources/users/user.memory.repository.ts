import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from './user.model';
import { IUser } from './user.types';
import CustomError from '../../common/customError';

/**
 * get all users
 * @returns all users
 */
const getAll = async (): Promise<IUser[]> => {
  const userRepository = getRepository(User);

  const allUsers = await userRepository.find()
  return allUsers;
};

/**
 * get user
 * @param id - id user
 * @returns user
 */
const getOne = async (id: string): Promise<IUser | undefined> => {
  const userRepository = getRepository(User);

  const foundUser = await userRepository.findOne({ id });

  if (!foundUser) throw new CustomError(404, `The user with id ${id} was not found`);

  return foundUser;
};

/**
 * create user
 * @param user - object with user parameters
 * @returns created user
 */
const create = async (props: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);

  const password = await bcrypt.hash(props.password, 10);

  const user = userRepository.create({
    ...props,
    password,
  });
  const newUser = await userRepository.save(user);
  
  return newUser;
};

/**
 * update user
 * @param id - id user
 * @param props - object with new user parameters
 * @returns updated user
 */
const update = async (id: string, props: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);

  const foundUser = await userRepository.findOne({ id });

  if (!foundUser) throw new CustomError(404, `Could not update user with id ${id}`);

  const updateUser = await userRepository.save({
    ...foundUser,
    ...props,
  });

  return updateUser;
};

/**
 * remove user
 * @param id - id user
 */
const remove = async (id: string): Promise<IUser> => {
  const userRepository = getRepository(User);

  const foundUser = await userRepository.findOne({ id });

  if (!foundUser) throw new CustomError(404, `The user with id ${id} was not found`);

  const deleteUser = await userRepository.remove(foundUser);

  return deleteUser;
};

export default { getAll, getOne, create, update, remove };
