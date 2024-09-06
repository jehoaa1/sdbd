import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { KeywordAlert } from './keyword-alert.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '제목' })
  title: string;

  @Column({ type: 'mediumtext', comment: '내용' })
  content: string;

  @Column({ type: 'varchar', length: 100, comment: '작성자 이름' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '수정일시',
  })
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.board, { cascade: true })
  comments: Comment[];

  @OneToMany(() => KeywordAlert, (keywordAlert) => keywordAlert.board)
  keywordAlerts: KeywordAlert[];
}
