import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './controllers/board.controller';
import { CommentController } from './controllers/comment.controller';
import { BoardService } from './services/board.service';
import { CommentService } from './services/comment.service';
import { KeywordAlertService } from './services/keyword-alert.service';
import { BoardRepository } from './repositories/board.query.repository';
import { CommentRepository } from './repositories/comment.query.repository';
import { KeywordAlertRepository } from './repositories/keyword-alert.query.repository';
import { Module } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Comment } from './entities/comment.entity';
import { KeywordAuthorInfo } from './entities/keyword-author-info.entity';
import { Keyword } from './entities/keyword.entity';
import { KeywordAlert } from './entities/keyword-alert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      BoardRepository,
      Comment,
      CommentRepository,
      KeywordAuthorInfo,
      Keyword,
      KeywordAlert,
    ]),
  ], // Board 엔티티 등록
  providers: [
    // services
    BoardService,
    BoardRepository,
    CommentService,
    CommentRepository,
    KeywordAlertService,
    KeywordAlertRepository,
  ],
  controllers: [BoardController, CommentController],
  exports: [BoardService],
})
export class BoardModule {}
