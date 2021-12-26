import { v4 as uuid } from 'uuid';
import { ITask } from './task.types';

class Task implements ITask {
  id: string;
  title: string;
  order: number; 
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor({
    id = uuid(),
    title,
    order,
    description,
    userId = null,
    boardId = null,
    columnId = null,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

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
