import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly repository: Repository<Board>,
  ) {}

  async createBoard(boardData: Partial<Board>): Promise<Board> {
    const newBoard = this.repository.create(boardData);
    return this.repository.save(newBoard);
  }

  // 추가적인 메소드들 정의 가능
}
