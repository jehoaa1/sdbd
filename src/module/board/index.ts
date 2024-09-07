import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './controllers/board.controller';
import { CommentController } from './controllers/comment.controller';
import { BoardService } from './services/board.service';
import { CommentService } from './services/comment.service';
import { BoardRepository } from './repositories/board.query.repository';
import { CommentRepository } from './repositories/comment.query.repository';
import { Module } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      BoardRepository,
      Comment,
      CommentRepository,
    ]),
  ], // Board 엔티티 등록
  providers: [
    // services
    BoardService,
    BoardRepository,
    CommentService,
    CommentRepository,
  ],
  controllers: [BoardController, CommentController],
  exports: [BoardService],
})
export class BoardModule {}
