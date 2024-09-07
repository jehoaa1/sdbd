import { Injectable } from '@nestjs/common';
import {
  CreateBoardDto,
  UpdateBoardDto,
  BoardResponseDto,
  GetBoardsQueryDto,
  GetBoardsResponseDto,
} from '../dtos/board.dto';
import { Board } from '../entities/board.entity';
import { BoardRepository } from '../repositories/board.query.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getAllBoards(
    getBoardsQueryDto: GetBoardsQueryDto,
  ): Promise<GetBoardsResponseDto> {
    // 페이징 처리
    const [boards, total] =
      await this.boardRepository.findAndCount(getBoardsQueryDto);

    // DTO 변환
    const boardResponseDtos = boards.map((board) =>
      this.toBoardResponseDto(board),
    );

    return { boards: boardResponseDtos, statusCode: 200, total };
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    const board = await this.boardRepository.createBoard(createBoardDto);
    return this.toBoardResponseDto(board);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<BoardResponseDto> {
    const board = await this.boardRepository.updateBoard(id, updateBoardDto);
    return this.toBoardResponseDto(board);
  }

  async deleteBoard(id: number, password: string): Promise<void> {
    return this.boardRepository.deleteBoard(id, password);
  }

  private toBoardResponseDto(board: Board): BoardResponseDto {
    return {
      id: board.id,
      title: board.title,
      content: board.content,
      name: board.name,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
    };
  }
}
