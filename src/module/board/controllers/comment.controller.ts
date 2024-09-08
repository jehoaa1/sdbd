import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  CreateCommentDto,
  GetCommentQueryDto,
  GetCommentsResponseDto,
  CommentResponseDto,
} from '../dtos/comment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: '게시글에 대한 댓글 목록 가져오기' })
  @ApiResponse({
    status: 200,
    description: '게시글에 대한 댓글 목록',
    type: GetCommentsResponseDto,
  })
  async getAllComments(
    @Query() query: GetCommentQueryDto,
  ): Promise<GetCommentsResponseDto> {
    return await this.commentService.getAllComments(query);
  }

  @Post()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({ status: 201, description: '댓글이 생성되었습니다.' })
  @ApiResponse({
    status: 200,
    description: '댓글 생성',
    type: CommentResponseDto,
  })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    return await this.commentService.createComment(createCommentDto);
  }
}
