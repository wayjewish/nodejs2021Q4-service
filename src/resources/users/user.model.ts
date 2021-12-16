import { v4 as uuid } from 'uuid';
import { IUser } from './user.types';

class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    id = uuid(),
    name,
    login,
    password
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
