import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Board } from '../entities/board.entity';
import {
  CreateBoardDto,
  UpdateBoardDto,
  GetBoardsQueryDto,
} from '../dtos/board.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAndCount(query: GetBoardsQueryDto): Promise<[Board[], number]> {
    const { title, name, page = 1, limit = 10 } = query;

    const whereConditions: any = {};
    if (title) {
      whereConditions.title = Like(`%${title}%`);
    }
    if (name) {
      whereConditions.name = Like(`%${name}%`);
    }

    return await this.boardRepository.findAndCount({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, content, name, password } = createBoardDto;

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBoard = this.boardRepository.create({
      title,
      content,
      name,
      password: hashedPassword,
    });

    return await this.boardRepository.save(newBoard);
  }

  async findBoardById(id: number): Promise<Board | undefined> {
    return await this.boardRepository.findOne({ where: { id } });
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const { title, content, password } = updateBoardDto;

    // 게시글 찾기
    const board = await this.findBoardById(id);

    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    const isPasswordMatching = await bcrypt.compare(password, board.password);
    if (!isPasswordMatching) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    // 게시글 업데이트
    board.title = title;
    board.content = content;

    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number, password: string): Promise<void> {
    // 게시글 찾기
    const board = await this.findBoardById(id);

    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 비밀번호 확인
    const isPasswordMatching = await bcrypt.compare(password, board.password);
    if (!isPasswordMatching) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    // 게시글 삭제
    await this.boardRepository.delete(id);
  }
}
