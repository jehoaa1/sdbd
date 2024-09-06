import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoardService } from '../services/board.service';
import { CreateBoardDto } from '../dtos/create-board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록 가져오기' })
  @ApiResponse({ status: 200, description: '게시글 목록 반환' })
  getAllBoards() {
    return this.boardService.getAllBoards();
  }

  @Post()
  @ApiOperation({ summary: '게시글 작성하기' })
  @ApiResponse({ status: 201, description: '게시글 작성 완료' })
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }
}
