import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserEntity | null> {
    console.log(login, password);
    const foundUser = await this.usersService.findOne(login);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      return foundUser;
    }

    return null;
  }

  async login(user: UserEntity) {
    console.log(user);
    const payload = { id: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
