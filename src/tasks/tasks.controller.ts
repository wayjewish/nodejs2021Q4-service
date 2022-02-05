import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@ApiBearerAuth()
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':taskId')
  findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(boardId, taskId);
  }

  @Post()
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() taskDto: TaskDto,
  ) {
    return this.tasksService.create(boardId, taskDto);
  }

  @Put(':taskId')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() taskDto: TaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, taskDto);
  }

  @Delete(':taskId')
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.remove(taskId);
  }
}
