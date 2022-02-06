import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  login!: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password!: string;
}
