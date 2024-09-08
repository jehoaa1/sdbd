# 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능

이 프로젝트는 NestJS를 사용하여 구축된 익명 게시판과 댓글 기능, 그리고 키워드 알림 기능을 포함하고 있습니다.

## 설치 및 설정 방법

### 1. Node.js 및 npm 설치

NestJS는 Node.js와 npm이 필요합니다. 아래 링크에서 Node.js를 다운로드하여 설치합니다:

- [Node.js 다운로드](https://nodejs.org/)

설치 후, 터미널에서 다음 명령어로 Node.js와 npm이 올바르게 설치되었는지 확인합니다

```bash
node -v
npm -v
```

### 2. NestJS CLI 설치

NestJS CLI(Command Line Interface)를 설치합니다. 이 도구를 사용하면 NestJS 프로젝트를 생성하고 관리하는 데 도움이 됩니다

```bash
npm install -g @nestjs/cli
```

### 3. 프로젝트 클론

다음 명령어를 사용하여 프로젝트를 클론합니다

```bash
git clone git@github.com:jehoaa1/sdbd.git
```

### 4. 패키지 설치

```bash
npm install
```

### 5. .env 설정

.env.example 파일이름을 .env로 변경 후 DB정보 입력해 줍니다.

```bash
DB_PORT=
DB_NAME=

DB_HOST=
DB_USERNAME=
DB_PASSWORD=
```

### 6. 서버 실행

클론한 프로젝트 디렉토리로 이동한 후, 다음 명령어로 서버를 실행합니다

```bash
npm run start
```

## 데이터베이스 스키마

```bash
#게시판
CREATE TABLE `board` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '제목',
  `content` mediumtext NOT NULL COMMENT '내용',
  `name` varchar(100) NOT NULL COMMENT '작성자 이름',
  `password` varchar(255) NOT NULL COMMENT '비밀번호',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시',
  KEY `id` (`id`),
  KEY `title` (`title`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시판';
```

```bash
#댓글
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `board_id` int(10) unsigned NOT NULL COMMENT 'board.id',
  `parent_comment_id` int(10) unsigned DEFAULT NULL COMMENT '부모 댓글 id',
  `level` tinyint(3) unsigned DEFAULT 1 COMMENT '댓글 레벨 [댓글의 댓글]',
  `content` text NOT NULL COMMENT '내용',
  `name` varchar(100) NOT NULL COMMENT '작성자',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `board_id` (`board_id`),
  KEY `parent_comment_id` (`parent_comment_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='댓글';

```

```bash
# 키워드 작성자 정보 테이블
CREATE TABLE `keyword_author_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '작성자',
  `phone` varchar(12) NOT NULL COMMENT '연락처',
  `email` varchar(100) NOT NULL COMMENT '이메일',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `name`(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='키워드 작성자 정보';
```

```bash
#키워드
CREATE TABLE `keyword` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyword_author_info_id` int(10) unsigned NOT NULL COMMENT 'keyword_author_info.id',
  `target_name` varchar(100) NOT NULL COMMENT '키워드 명',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `keyword_author_info_id`(`keyword_author_info_id`),
  KEY `target_name`(`target_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='키워드';
```

```bash
#키워드 알림
CREATE TABLE `keyword_alert` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyword_id` int(10) unsigned DEFAULT NULL COMMENT 'keyword.id',
  `board_id` int(10) unsigned NOT NULL COMMENT 'board.id',
  `content` text NOT NULL COMMENT '내용',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `keyword_id` (`keyword_id`),
  KEY `board_id` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='키워드 알림';
```

```
#키워드알림, 키워드 더미 데이터

insert into keyword_author_info value (null, '허제호', '01084630618', 'jehoaa1@gmail.com', now())

insert into keyword value (null, 1, '키워드1', now()),(null, 1, '키워드2', now()),(null, 1, '강아지', now()), (null, 1, '고양이', now())

```

## API 목록

이 프로젝트에서는 다음과 같은 API를 제공합니다:

### 게시글 관련 API

- **게시글 목록 API**: 모든 게시글을 조회합니다.
- **게시글 작성 API**: 새로운 게시글을 작성합니다.
- **게시글 수정 API**: 기존 게시글을 수정합니다.
- **게시글 삭제 API**: 게시글을 삭제합니다.

### 댓글 관련 API

- **댓글 목록 API**: 특정 게시글의 모든 댓글을 조회합니다.
- **댓글 작성 API**: 게시글에 댓글을 작성합니다.

### 알림 기능

- **게시물 또는 댓글 등록 시 알림 기능 구현**: 게시물 또는 댓글 등록 시 설정된 키워드와 관련된 사용자에게 알림을 전송합니다.
