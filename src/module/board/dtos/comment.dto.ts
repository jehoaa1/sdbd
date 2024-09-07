import { ApiProperty } from '@nestjs/swagger';

export class GetCommentQueryDto {
  @ApiProperty({
    description: '게시글 번호',
    example: 1,
  })
  boardId: number;

  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '페이지 당 항목 수',
    example: 10,
  })
  limit: number;
}

export class commentResponseDto {
  @ApiProperty({
    description: '댓글 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  board_id: number;

  @ApiProperty({
    description: '부모 댓글 ID',
    example: 1,
  })
  parent_comment_id?: number;

  @ApiProperty({
    description: '댓글 레벨[댓글의 위치]',
    example: 1,
  })
  level: number;

  @ApiProperty({
    description: '댓글 작성자',
    example: '허제호',
  })
  name: string;

  @ApiProperty({
    description: '댓글 내용',
    example: '댓글입니다.',
  })
  content: string;

  @ApiProperty({
    description: '댓글 생성 날짜',
    example: '2024-09-07T10:00:00Z',
  })
  created_at: Date;
}

export class GetCommentsResponseDto {
  @ApiProperty({
    type: [commentResponseDto],
    description: '댓글 목록',
  })
  comments: commentResponseDto[];

  @ApiProperty({
    description: '상태 코드',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: '총 댓글 수',
  })
  total: number;
}

export class CreateCommentDto {
  @ApiProperty({ example: '게시글 ID', description: '댓글이 달릴 게시글 ID' })
  board_id: number;

  @ApiProperty({
    example: '부모 댓글 ID',
    description: '부모 댓글 ID',
    required: false,
  })
  parent_comment_id?: number;

  @ApiProperty({ example: '댓글 내용', description: '댓글의 내용' })
  content: string;

  @ApiProperty({ example: '작성자 이름', description: '댓글 작성자' })
  name: string;
}
