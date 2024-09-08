import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { KeywordAuthorInfo } from './keyword-author-info.entity';
import { KeywordAlert } from './keyword-alert.entity';

@Entity('keyword')
export class Keyword {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: 'keyword_author_info.id',
    name: 'keyword_author_info_id',
  })
  keywordAuthorInfoId: number;

  @ManyToOne(
    () => KeywordAuthorInfo,
    (keywordAuthorInfo) => keywordAuthorInfo.keywords,
  )
  @JoinColumn({ name: 'keyword_author_info_id' }) // 외래 키 컬럼을 명시
  keywordAuthorInfo: KeywordAuthorInfo;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '키워드 명',
    name: 'target_name',
  })
  targetName: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '작성일시',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => KeywordAlert, (keywordAlert) => keywordAlert.keyword)
  alerts: KeywordAlert[];
}
