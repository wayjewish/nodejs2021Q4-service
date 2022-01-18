import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IBoard } from './board.types';

@Entity()
class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  columns!: { 
    id: string; 
    title: string; 
    order: number 
  }[];

  /**
   * return board to response
   * @param board - object with board parameters
   * @returns board
   */
  static toResponse(board: IBoard): IBoard {
    return board;
  }
}

export default Board;
