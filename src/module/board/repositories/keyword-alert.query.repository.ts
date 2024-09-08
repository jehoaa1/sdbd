import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { KeywordAuthorInfo } from '../entities/keyword-author-info.entity';
import { Keyword } from '../entities/keyword.entity';
import { KeywordAlert } from '../entities/keyword-alert.entity';
import {
  KeywordAlertQueryDto,
  CommentAlertQueryDto,
} from '../dtos/keyword-alert.dto';

@Injectable()
export class KeywordAlertRepository {
  constructor(
    @InjectRepository(KeywordAuthorInfo)
    private readonly keywordAuthorInfoRepository: Repository<KeywordAuthorInfo>,
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
    @InjectRepository(KeywordAlert)
    private readonly keywordAlertRepository: Repository<KeywordAlert>,
  ) {}

  async createKeywordAlertIfKeywordExists(
    keywordAlertQueryDto: KeywordAlertQueryDto,
  ) {
    const { keywordInputs, content, boardId } = keywordAlertQueryDto;
    // Step 1: 입력된 키워드와 일치하는 키워드를 찾기
    const keyword = await this.keywordRepository.findOne({
      where: {
        targetName: In(keywordInputs), // 배열을 IN 조건으로 사용
      },
      relations: ['keywordAuthorInfo'],
    });

    if (!keyword) {
      console.log('일치하는 키워드가 없습니다.');
      return;
    }

    const authorInfo = keyword.keywordAuthorInfo;

    if (authorInfo) {
      // Step 2: 새로운 KeywordAlert 레코드 생성
      const keywordAlert = new KeywordAlert();
      keywordAlert.keywordId = keyword.id;
      keywordAlert.boardId = boardId || null;
      keywordAlert.content = content;

      // Step 3: 데이터베이스에 알림 삽입
      await this.keywordAlertRepository.save(keywordAlert);

      console.log(`키워드 ${keyword.targetName}에 대한 알림이 생성되었습니다.`);
    }
  }

  async createCommentAlertIfKeywordExists(
    commentAlertQueryDto: CommentAlertQueryDto,
  ) {
    const { content, boardId } = commentAlertQueryDto;

    // Step 2: 새로운 KeywordAlert 레코드 생성
    const keywordAlert = new KeywordAlert();
    keywordAlert.boardId = boardId || null;
    keywordAlert.content = content;

    // Step 3: 데이터베이스에 알림 삽입
    await this.keywordAlertRepository.save(keywordAlert);

    console.log(`댓글에 대한 알림이 생성되었습니다.`);
  }
}
