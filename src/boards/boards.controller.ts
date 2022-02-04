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
import { BoardDto } from './boards.dto';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardsService.findOne(id);
  }

  @Post()
  create(@Body() boardDto: BoardDto) {
    return this.boardsService.create(boardDto);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() boardDto: BoardDto) {
    return this.boardsService.update(id, boardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
