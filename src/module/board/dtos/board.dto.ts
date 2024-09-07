import { ApiProperty } from '@nestjs/swagger';

export class GetBoardsQueryDto {
  @ApiProperty({
    description: '검색할 제목',
    example: '게시글 제목',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: '검색할 작성자',
    example: '홍길동',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  page?: number;

  @ApiProperty({
    description: '페이지 당 항목 수',
    example: 10,
  })
  limit?: number;
}

class BaseBoardDto {
  @ApiProperty({ example: '게시글 제목', description: '게시글의 제목' })
  title: string;

  @ApiProperty({ example: '게시글 내용', description: '게시글의 내용' })
  content: string;

  @ApiProperty({ example: '비밀번호', description: '게시글 비밀번호' })
  password: string;
}

export class CreateBoardDto extends BaseBoardDto {
  @ApiProperty({ example: '작성자 이름', description: '게시글 작성자' })
  name: string;
}

export class UpdateBoardDto extends BaseBoardDto {}

export class DeleteBoardDto {
  @ApiProperty({ example: '비밀번호', description: '게시글 비밀번호' })
  password: string;
}

export class BoardResponseDto {
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '제목입니다',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '내용입니다',
  })
  content: string;

  @ApiProperty({
    description: '게시글 작성자',
    example: '허제호',
  })
  name: string;

  @ApiProperty({
    description: '게시글 생성 날짜',
    example: '2024-09-07T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 업데이트 날짜',
    example: '2024-09-07T10:00:00Z',
  })
  updatedAt: Date;
}

export class GetBoardsResponseDto {
  @ApiProperty({
    type: [BoardResponseDto],
    description: '게시글 목록',
  })
  boards: BoardResponseDto[];

  @ApiProperty({
    description: '총 게시글 수',
  })
  total: number;
}

class BaseResponseDto {
  @ApiProperty({
    description: '응답 메시지',
    example: '게시글이 성공적으로 00 되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '상태 코드',
    example: 200,
  })
  statusCode: number;
}

export class GetBoardResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: '게시글 목록',
    type: [BoardResponseDto],
  })
  page: number;
  boardList: [BoardResponseDto];
}

export class UpdateBoardResponseDto extends BaseResponseDto {
  @ApiProperty({
    description: '수정된 게시글',
    type: BoardResponseDto,
  })
  updatedBoard: BoardResponseDto;
}

export class DeleteBoardResponseDto extends BaseResponseDto {}
