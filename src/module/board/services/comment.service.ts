import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.query.repository';
import {
  CommentResponseDto,
  CreateCommentDto,
  GetCommentQueryDto,
  GetCommentsResponseDto,
} from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { KeywordAlertService } from '../services/keyword-alert.service';
import { BoardService } from '../services/board.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly keywordAlertService: KeywordAlertService,
    private readonly boardService: BoardService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const { board_id } = createCommentDto;
    const board = await this.boardService.findBoardById(board_id);
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const comment =
      await this.commentRepository.createComment(createCommentDto);

    await this.keywordAlertService.createCommentAlertIfKeywordExists({
      content: '게시글에 댓글이 등록되었습니다',
      boardId: board_id,
    });
    return this.toCommentResponseDto(comment);
  }

  async getAllComments(
    getBoardsQueryDto: GetCommentQueryDto,
  ): Promise<GetCommentsResponseDto> {
    // 페이징 처리
    const [comments, total] =
      await this.commentRepository.findAndCount(getBoardsQueryDto);

    // DTO 변환
    const commentResponseDtos = comments.map((board) =>
      this.toCommentResponseDto(board),
    );

    return { comments: commentResponseDtos, statusCode: 200, total };
  }

  private toCommentResponseDto(comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      board_id: comment.board_id,
      parent_comment_id: comment.parent_comment_id,
      level: comment.level,
      name: comment.name,
      content: comment.content,
      created_at: comment.created_at,
    };
  }
}
