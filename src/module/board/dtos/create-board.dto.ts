import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: '게시글 제목', description: '게시글의 제목' })
  title: string;

  @ApiProperty({ example: '게시글 내용', description: '게시글의 내용' })
  content: string;

  @ApiProperty({ example: '작성자 이름', description: '게시글 작성자' })
  name: string;

  @ApiProperty({ example: '비밀번호', description: '게시글 비밀번호' })
  password: string;
}
