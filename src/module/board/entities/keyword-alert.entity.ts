import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Keyword } from './keyword.entity';
import { Board } from './board.entity';

@Entity('keyword_alert')
export class KeywordAlert {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'keyword.id',
    name: 'keyword_id',
    nullable: true,
  })
  keywordId: number | null; // 엔티티 속성 이름 수정

  @ManyToOne(() => Keyword, (keyword) => keyword.alerts, { nullable: true })
  @JoinColumn({ name: 'keyword_id' }) // 외래 키 컬럼 이름 명시
  keyword: Keyword | null;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'board.id',
    name: 'board_id',
  })
  boardId: number; // 엔티티 속성 이름 수정

  @ManyToOne(() => Board, (board) => board.keywordAlerts)
  @JoinColumn({ name: 'board_id' }) // 외래 키 컬럼 이름 명시
  board: Board;

  @Column({ type: 'text', comment: '내용' })
  content: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
    name: 'created_at',
  })
  createdAt: Date; // 엔티티 속성 이름 수정
}
