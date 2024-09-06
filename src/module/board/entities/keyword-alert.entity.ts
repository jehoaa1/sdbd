import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';
import { Comment } from './comment.entity';

@Entity('keyword_alert')
export class KeywordAlert {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '알림 대상자 이름' })
  name: string;

  @Column({ type: 'int', unsigned: true, nullable: true, comment: 'board.id' })
  board_id: number | null;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    comment: 'comments.id',
  })
  comments_id: number | null;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
  })
  created_at: Date;

  @ManyToOne(() => Board, (board) => board.keywordAlerts, {
    onDelete: 'CASCADE',
  })
  board: Board | null;

  @ManyToOne(() => Comment, (comment) => comment.id, { onDelete: 'CASCADE' })
  comment: Comment | null;
}
