import { Injectable } from '@nestjs/common';
import { KeywordAlertRepository } from '../repositories/keyword-alert.query.repository';
import {
  KeywordAlertQueryDto,
  CommentAlertQueryDto,
} from '../dtos/keyword-alert.dto';

@Injectable()
export class KeywordAlertService {
  constructor(
    private readonly keywordAlertRepository: KeywordAlertRepository,
  ) {}

  async createKeywordAlertIfKeywordExists(
    keywordAlertQueryDto: KeywordAlertQueryDto,
  ) {
    await this.keywordAlertRepository.createKeywordAlertIfKeywordExists(
      keywordAlertQueryDto,
    );
  }

  async createCommentAlertIfKeywordExists(
    commentAlertQueryDto: CommentAlertQueryDto,
  ) {
    await this.keywordAlertRepository.createCommentAlertIfKeywordExists(
      commentAlertQueryDto,
    );
  }

  // 특수기호를 제거하고 중복된 데이터를 제거하는 함수
  cleanKeywords(keywords: string[]): string[] {
    // 특수기호 제거: 한글, 알파벳, 숫자, 공백을 제외한 모든 문자를 제거
    const cleanedKeywords = keywords.map(
      (keyword) => keyword.replace(/[^\w\s가-힣]/g, ''), // 한글을 포함하도록 정규 표현식 수정
    );

    // 중복된 데이터 제거: Set을 사용하여 유일한 값만 남김
    const uniqueKeywords = Array.from(new Set(cleanedKeywords));

    return uniqueKeywords;
  }
}
