import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoardService } from '../services/board.service';
import {
  GetBoardsQueryDto,
  GetBoardsResponseDto,
  CreateBoardDto,
  UpdateBoardDto,
  DeleteBoardDto,
  BoardResponseDto,
  UpdateBoardResponseDto,
  DeleteBoardResponseDto,
} from '../dtos/board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록 가져오기' })
  @ApiResponse({
    status: 200,
    description: '게시글 목록과 총 게시글 수',
    type: GetBoardsResponseDto,
  })
  async getAllBoards(
    @Query() query: GetBoardsQueryDto,
  ): Promise<{ boards: BoardResponseDto[]; total: number }> {
    return await this.boardService.getAllBoards(query);
  }

  @Post()
  @ApiOperation({ summary: '게시글 작성하기' })
  @ApiResponse({
    status: 200,
    type: BoardResponseDto,
    description: '게시글 작성 완료',
  })
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 수정되었습니다.',
    type: UpdateBoardResponseDto,
  })
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    try {
      const updatedBoard = await this.boardService.updateBoard(
        id,
        updateBoardDto,
      );
      return {
        message: '게시글이 성공적으로 수정되었습니다.',
        statusCode: 200,
        updatedBoard,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new Error('게시글 수정 중 오류가 발생했습니다.');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 삭제되었습니다.',
    type: DeleteBoardResponseDto,
  })
  async deleteBoard(
    @Param('id') id: number,
    @Body() deleteBoardDto: DeleteBoardDto,
  ) {
    const { password } = deleteBoardDto;
    try {
      await this.boardService.deleteBoard(id, password);
      return {
        message: '게시글이 성공적으로 삭제되었습니다.',
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new Error('게시글 삭제 중 오류가 발생했습니다.');
    }
  }
}
