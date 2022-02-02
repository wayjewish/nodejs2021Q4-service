import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './users.entity';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return foundUser;
  }

  async create(props: UserDto): Promise<User> {
    const password = await bcrypt.hash(props.password, 10);
    const user = this.usersRepository.create({
      ...props,
      password,
    });

    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async update(id: string, props: UserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const password = await bcrypt.hash(props.password, 10);

    const updateUser = await this.usersRepository.save({
      ...foundUser,
      ...props,
      password,
    });

    return updateUser;
  }

  async remove(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const deleteUser = await this.usersRepository.remove(foundUser);
    return deleteUser;
  }
}
