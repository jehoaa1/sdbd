import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, comment: 'board.id' })
  board_id: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    comment: '부모 댓글 id',
  })
  parent_comment_id: number | null;

  @Column({ type: 'mediumtext', comment: '내용' })
  content: string;

  @Column({ type: 'varchar', length: 100, comment: '작성자' })
  name: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
  })
  created_at: Date;

  @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => Comment, (comment) => comment.id, { onDelete: 'CASCADE' })
  parentComment: Comment | null;
}
