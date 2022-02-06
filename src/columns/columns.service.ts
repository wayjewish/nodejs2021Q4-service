import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './columns.entity';
import { ColumnDto } from './columns.dto';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    private boardService: BoardsService,
  ) {}

  async findAll(boardId: string): Promise<ColumnEntity[]> {
    const allColumns = await this.columnsRepository.find({
      where: { boardId },
    });
    return allColumns;
  }

  async findOne(boardId: string, columnId: string): Promise<ColumnEntity> {
    const foundColumn = await this.columnsRepository.findOne({
      id: columnId,
      boardId,
    });
    if (!foundColumn) throw new NotFoundException();
    return foundColumn;
  }

  async create(boardId: string, props: ColumnDto): Promise<ColumnEntity> {
    await this.boardService.findOne(boardId);

    const column = this.columnsRepository.create({ ...props, boardId });

    const newColumn = await this.columnsRepository.save(column);
    return newColumn;
  }

  async update(
    boardId: string,
    columnId: string,
    props: ColumnDto,
  ): Promise<ColumnEntity> {
    const foundColumn = await this.columnsRepository.findOne({
      id: columnId,
      boardId,
    });
    if (!foundColumn) throw new NotFoundException();

    Object.assign(foundColumn, props);

    const updateColumn = await this.columnsRepository.save(foundColumn);

    return updateColumn;
  }

  async remove(columnId: string): Promise<ColumnEntity> {
    const foundColumn = await this.columnsRepository.findOne(columnId);
    if (!foundColumn) throw new NotFoundException();

    const deleteColumn = await this.columnsRepository.remove(foundColumn);
    return deleteColumn;
  }
}
