import usersRepo from './login.controller';
import { ILogin } from './login.types';

const login = (user: ILogin) => usersRepo.login(user);

export default { login };
