import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.TasksService.findAll(boardId);
  }

  @Get(':id')
  findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.TasksService.findOne(boardId, taskId);
  }

  @Post()
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() TaskDto: TaskDto,
  ) {
    return this.TasksService.create(boardId, TaskDto);
  }

  @Put(':id')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() TaskDto: TaskDto,
  ) {
    return this.TasksService.update(boardId, taskId, TaskDto);
  }

  @Delete(':id')
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.TasksService.remove(boardId, taskId);
  }
}
