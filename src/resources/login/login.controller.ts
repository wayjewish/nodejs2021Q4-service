import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import User from '../users/user.model';
import { ILogin, IToken } from './login.types';
import CustomError from '../../common/customError';
import generateAuthToken from '../../authorization/generateAuthToken';

/**
 * login user
 * @param props - object with a username and password
 * @returns token
 */
const login = async (props: ILogin): Promise<IToken> => {
  const userRepository = getRepository(User);
  const foundUser = await userRepository.findOne({ where: { login: props.login } });
  if (!foundUser) throw new CustomError(403, 'Wrong user login');

  const match = await bcrypt.compare(props.password, foundUser.password);
  if (!match) throw new CustomError(403, 'Wrong user password');

  const token = {
    token: await generateAuthToken(foundUser),
  };
  
  return token;
};

export default { login };
