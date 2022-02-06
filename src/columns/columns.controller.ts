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
import { ColumnDto } from './columns.dto';
import { ColumnsService } from './columns.service';

@UseGuards(JwtAuthGuard)
@ApiTags('columns')
@ApiBearerAuth()
@Controller('/boards/:boardId/columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Get()
  findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.columnsService.findAll(boardId);
  }

  @Get(':columnId')
  findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ) {
    return this.columnsService.findOne(boardId, columnId);
  }

  @Post()
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() columnDto: ColumnDto,
  ) {
    return this.columnsService.create(boardId, columnDto);
  }

  @Put(':columnId')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() columnDto: ColumnDto,
  ) {
    return this.columnsService.update(boardId, columnId, columnDto);
  }

  @Delete(':columnId')
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ) {
    return this.columnsService.remove(columnId);
  }
}
