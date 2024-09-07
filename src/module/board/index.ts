import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './controllers/board.controller';
import { BoardService } from './services/board.service';
import { BoardRepository } from './repositories/board.query.repository';
import { Module } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository])], // Board 엔티티 등록
  providers: [
    // services
    BoardService,
    BoardRepository,
  ],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
