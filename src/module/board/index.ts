import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './cotrollers/board.controller';
import { BoardService } from './services/board.service';
import { Module } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])], // Board 엔티티 등록
  providers: [
    // services
    BoardService,
  ],
  controllers: [BoardController],
  exports: [],
})
export class BoardModule {}
