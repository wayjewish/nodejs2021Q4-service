import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { TaskDto } from './tasks.dto';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private boardService: BoardsService,
  ) {}

  async findAll(boardId: string): Promise<Task[]> {
    const allTasks = await this.tasksRepository.find({ where: { boardId } });
    return allTasks;
  }

  async findOne(boardId: string, taskId: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      id: taskId,
      boardId,
    });
    if (!foundTask) throw new NotFoundException();
    return foundTask;
  }

  async create(boardId: string, props: TaskDto): Promise<Task> {
    await this.boardService.findOne(boardId);

    const task = this.tasksRepository.create({ ...props, boardId });

    const newTask = await this.tasksRepository.save(task);
    return newTask;
  }

  async update(boardId: string, taskId: string, props: TaskDto): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({
      id: taskId,
      boardId,
    });
    if (!foundTask) throw new NotFoundException();

    Object.assign(foundTask, props);

    const updateTask = await this.tasksRepository.save(foundTask);

    return updateTask;
  }

  async remove(taskId: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne(taskId);
    if (!foundTask) throw new NotFoundException();

    const deleteTask = await this.tasksRepository.remove(foundTask);
    return deleteTask;
  }
}
