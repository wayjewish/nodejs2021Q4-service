import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserEntity } from './users.entity';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const allUsers = await this.usersRepository.find();
    return allUsers.map((user) => {
      return user;
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  async create(props: UserDto): Promise<UserEntity> {
    const password = await bcrypt.hash(props.password, 10);
    const user = this.usersRepository.create({
      ...props,
      password,
    });

    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async update(id: string, props: UserDto): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new NotFoundException();

    const password = await bcrypt.hash(props.password, 10);

    const updateUser = await this.usersRepository.save({
      ...foundUser,
      ...props,
      password,
    });

    return updateUser;
  }

  async remove(id: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) throw new NotFoundException();

    const deleteUser = await this.usersRepository.remove(foundUser);
    return deleteUser;
  }

  async findByLogin(login: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOne({ login });
    if (!foundUser) throw new NotFoundException();
    return foundUser;
  }

  async addDmin(): Promise<void> {
    const foundAmin = await this.usersRepository.findOne({ login: 'admin' });
    if (!foundAmin) {
      const props = {
        name: 'admin',
        login: 'admin',
        password: 'admin',
      };

      const password = await bcrypt.hash(props.password, 10);
      const user = this.usersRepository.create({
        ...props,
        password,
      });

      await this.usersRepository.save(user);
      console.log('add admin');
    }
  }
}
