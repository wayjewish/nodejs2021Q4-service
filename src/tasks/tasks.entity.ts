import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { BoardEntity } from '../boards/boards.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class TaskEntity extends BaseEntity {
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

  @ManyToOne(() => BoardEntity, (board) => board.id, { onDelete: 'CASCADE' })
  board!: BoardEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  user!: UserEntity;
}
