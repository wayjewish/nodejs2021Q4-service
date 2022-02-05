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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardDto } from './boards.dto';
import { BoardsService } from './boards.service';

@UseGuards(JwtAuthGuard)
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
