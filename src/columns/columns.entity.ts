import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { BoardEntity } from 'src/boards/boards.entity';

@Entity()
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column('uuid')
  boardId!: string;

  @ManyToOne(() => BoardEntity, (board) => board.id, { onDelete: 'CASCADE' })
  board!: BoardEntity;
}
