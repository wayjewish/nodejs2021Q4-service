import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './boards.entity';
import { BoardDto } from './boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  async findAll(): Promise<BoardEntity[]> {
    const allBoards = await this.boardsRepository.find();
    return allBoards;
  }

  async findOne(id: string): Promise<BoardEntity> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();
    return foundBoard;
  }

  async create(props: BoardDto): Promise<BoardEntity> {
    console.log(props);
    const board = this.boardsRepository.create(props);
    const newBoard = await this.boardsRepository.save(board);
    return newBoard;
  }

  async update(id: string, props: BoardDto): Promise<BoardEntity> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();

    const updateBoard = await this.boardsRepository.save({
      ...foundBoard,
      ...props,
    });

    return updateBoard;
  }

  async remove(id: string): Promise<BoardEntity> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();

    const deleteBoard = await this.boardsRepository.remove(foundBoard);
    return deleteBoard;
  }
}
