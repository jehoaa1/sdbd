import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { KeywordAlertService } from '../services/keyword-alert.service';
import {
  CreateCommentDto,
  GetCommentQueryDto,
  GetCommentsResponseDto,
} from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly keywordAlertService: KeywordAlertService,
  ) {}

  @Get('comments/:boardId')
  @ApiOperation({ summary: '게시글에 대한 댓글 목록 가져오기' })
  @ApiResponse({
    status: 200,
    description: '게시글에 대한 댓글 목록',
    type: [Comment],
  })
  async getAllComments(
    @Query() query: GetCommentQueryDto,
  ): Promise<GetCommentsResponseDto> {
    return await this.commentService.getAllComments(query);
  }

  @Post()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({ status: 201, description: '댓글이 생성되었습니다.' })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentService.createComment(createCommentDto);
    const { board_id } = createCommentDto;
    await this.keywordAlertService.createCommentAlertIfKeywordExists({
      content: '게시글에 댓글이 등록되었습니다',
      boardId: board_id,
    });
    return comment;
  }
}
