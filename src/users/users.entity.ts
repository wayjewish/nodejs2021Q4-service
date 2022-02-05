import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}

export class UserEntity {
  id!: string;
  name!: string;
  login!: string;

  @Exclude()
  password!: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
