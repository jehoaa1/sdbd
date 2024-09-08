import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Keyword } from './keyword.entity';

@Entity('keyword_author_info')
export class KeywordAuthorInfo {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, comment: '작성자' })
  name: string;

  @Column({ type: 'varchar', length: 12, comment: '연락처' })
  phone: string;

  @Column({ type: 'varchar', length: 100, comment: '이메일' })
  email: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Keyword, (keyword) => keyword.keywordAuthorInfo)
  keywords: Keyword[];
}
