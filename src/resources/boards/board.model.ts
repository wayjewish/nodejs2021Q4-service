import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from './board.types';

class Board implements IBoard {
  id: string;
  title: string;
  columns: IColumn[] | [];

  constructor({
    id = uuid(),
    title,
    columns = [],
  }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): IBoard {
    return board;
  }
}

export default Board;
