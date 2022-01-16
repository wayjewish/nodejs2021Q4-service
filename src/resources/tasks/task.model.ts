import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ITask } from './task.types';
import Board from '../boards/board.model';
import User from '../users/user.model';

@Entity()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    nullable: true,
  })
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

  @Column({
    type: 'uuid',
    nullable: true,
  })
  boardId!: string | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  columnId!: string | null;

  @ManyToOne(() => Board, (board) => board.id)
  board!: Board;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  /**
   * return task to response
   * @param task - object with task parameters
   * @returns task
   */
  static toResponse(task: ITask) {
    return task;
  }
}

export default Task;
