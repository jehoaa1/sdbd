import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.query.repository';
import {
  commentResponseDto,
  CreateCommentDto,
  GetCommentQueryDto,
  GetCommentsResponseDto,
} from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.createComment(createCommentDto);
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

  private toCommentResponseDto(comment: Comment): commentResponseDto {
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
