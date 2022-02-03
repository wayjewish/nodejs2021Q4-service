import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Board } from '../boards/boards.entity';
import { User } from '../users/users.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  userId!: string | null;

  @Column('uuid')
  boardId!: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  columnId!: string | null;

  @ManyToOne(() => Board, (board) => board.id)
  board!: Board;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
