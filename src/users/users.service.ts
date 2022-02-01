import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly cats: User[] = [];

  findAll(): User[] {
    return this.cats;
  }

  findOne(id: string): User {
    const foundUser = this.cats.find((user) => user.id === id);

    if (!foundUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return foundUser;
  }
}
