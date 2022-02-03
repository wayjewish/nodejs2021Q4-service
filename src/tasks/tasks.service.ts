import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './tasks.entity';
import { BoardDto } from './tasks.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    const allBoards = await this.boardsRepository.find();
    return allBoards;
  }

  async findOne(id: string): Promise<Board> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();
    return foundBoard;
  }

  async create(props: BoardDto): Promise<Board> {
    const board = this.boardsRepository.create(props);
    const newBoard = await this.boardsRepository.save(board);
    return newBoard;
  }

  async update(id: string, props: BoardDto): Promise<Board> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();

    const updateBoard = await this.boardsRepository.save({
      ...foundBoard,
      ...props,
    });

    return updateBoard;
  }

  async remove(id: string): Promise<Board> {
    const foundBoard = await this.boardsRepository.findOne(id);
    if (!foundBoard) throw new NotFoundException();

    const deleteBoard = await this.boardsRepository.remove(foundBoard);
    return deleteBoard;
  }
}
