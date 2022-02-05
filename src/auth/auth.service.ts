import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';
import { TokenDto } from './token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const foundUser = await this.usersService.findByLogin(login);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      return foundUser;
    }

    return null;
  }

  async login(user: User): Promise<TokenDto> {
    const payload = { id: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
