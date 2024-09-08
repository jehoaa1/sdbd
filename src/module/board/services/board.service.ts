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
import { KeywordAlertService } from '../services/keyword-alert.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly keywordAlertService: KeywordAlertService,
  ) {}

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

  async findBoardById(id: number): Promise<Board | undefined> {
    return await this.boardRepository.findBoardById(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    const board = await this.boardRepository.createBoard(createBoardDto);
    const { title, content } = createBoardDto;

    const titleList = title.split(' ');
    const contentList = content.split(' ');
    const targetKeywordList = [...titleList, ...contentList];
    //특수기호 제거 및 중복 제거
    const keywordInputs =
      await this.keywordAlertService.cleanKeywords(targetKeywordList);

    await this.keywordAlertService.createKeywordAlertIfKeywordExists({
      keywordInputs,
      content: '새 게시글에 회원님이 언급되었습니다.',
      boardId: board.id,
    });

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
