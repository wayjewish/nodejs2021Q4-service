import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './tasks.entity';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), BoardsModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
