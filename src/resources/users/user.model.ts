import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IUser } from './user.types';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  /**
   * return user object without password to response
   * @param user - object with user parameters
   * @returns user object without password
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
