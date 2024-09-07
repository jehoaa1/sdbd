import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, GetCommentQueryDto } from '../dtos/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { content, name, board_id, parent_comment_id } = createCommentDto;

    let level = 1; // 기본 level 값

    // parent_comment_id가 있을 경우 부모 댓글의 level을 가져와 +1
    if (parent_comment_id) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: parent_comment_id },
      });

      if (!parentComment) {
        throw new NotFoundException('부모 댓글을 찾을 수 없습니다.');
      }

      // 부모 댓글의 board_id와 현재 board_id가 일치하는지 확인
      if (parentComment.board_id !== Number(board_id)) {
        throw new BadRequestException(
          '부모 댓글은 같은 게시글에 있어야 합니다.',
        );
      }

      level = parentComment.level + 1; // 부모 댓글의 level + 1로 설정
    }

    const newComment = this.commentRepository.create({
      content,
      name,
      board_id,
      parent_comment_id,
      level,
    });

    return await this.commentRepository.save(newComment);
  }

  async findAndCount(query: GetCommentQueryDto): Promise<[Comment[], number]> {
    const { page = 1, limit = 10 } = query;

    if (page < 1) {
      throw new BadRequestException('페이지 번호는 1 이상이어야 합니다.');
    }

    // 쿼리 실행 결과 확인
    try {
      const comments = await this.commentRepository.query(`
        WITH RECURSIVE CommentTree AS (
          SELECT
            id,
            board_id,
            parent_comment_id,
            level,
            content,
            name,
            created_at,
            CAST(id AS CHAR(36)) AS path
          FROM
            comments
          WHERE
            parent_comment_id IS NULL
          UNION ALL
          SELECT
            c.id,
            c.board_id,
            c.parent_comment_id,
            c.level,
            c.content,
            c.name,
            c.created_at,
            CONCAT(ct.path, '.', CAST(c.id AS CHAR(36))) AS path
          FROM
            comments c
            INNER JOIN CommentTree ct ON c.parent_comment_id = ct.id
        )
        SELECT
          id,
          board_id,
          parent_comment_id,
          level,
          content,
          name,
          created_at,
          path
        FROM
          CommentTree
        ORDER BY
          path
        LIMIT ${limit} OFFSET ${(page - 1) * limit}
      `);

      // 총 댓글 수 계산
      const [totalCount] = await this.commentRepository.query(`
        WITH RECURSIVE CommentTree AS (
          SELECT
            id AS comment_id,
            board_id,
            parent_comment_id,
            level,
            content,
            name,
            created_at,
            CAST(id AS CHAR(36)) AS path
          FROM
            comments
          WHERE
            parent_comment_id IS NULL
          UNION ALL
          SELECT
            c.id,
            c.board_id,
            c.parent_comment_id,
            c.level,
            c.content,
            c.name,
            c.created_at,
            CONCAT(ct.path, '.', CAST(c.id AS CHAR(36))) AS path
          FROM
            comments c
            INNER JOIN CommentTree ct ON c.parent_comment_id = ct.comment_id
        )
        SELECT COUNT(*) AS count
        FROM CommentTree
      `);

      return [comments, totalCount.count];
    } catch (error) {
      console.error('Query Error:', error);
      throw new BadRequestException('쿼리 실행 중 오류가 발생했습니다.');
    }
  }
}
