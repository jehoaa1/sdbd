import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAllBoards() {}
  // 게시글 삽입 메서드
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, content, name, password } = createBoardDto;

    const newBoard = this.boardRepository.create({
      title,
      content,
      name,
      password,
    });

    return await this.boardRepository.save(newBoard);
  }
}
