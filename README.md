# 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능
프레임워크는 NestJS를 사용했습니다.

## - 설치 및 설정법

### 1. Node.js 및 npm 설치

NestJS는 Node.js와 npm이 필요합니다. 아래 링크에서 Node.js를 다운로드하여 설치합니다:

- [Node.js 다운로드](https://nodejs.org/)

설치 후, 터미널에서 다음 명령어로 Node.js와 npm이 올바르게 설치되었는지 확인합니다:

```bash
node -v
npm -v
```

### 2. NestJS 설치 
```bash
npm install -g @nestjs/cli
```

### 3. 익명 게시판 git clone
```bash
git clone git@github.com:jehoaa1/sdbd.git
``` 

### 4. 서버 실행
```bash
npm run start
```

## - DB 스키마

```bash
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
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `board_id` int(10) unsigned NOT NULL COMMENT 'board.id',
  `parent_comment_id` int(10) unsigned DEFAULT NULL COMMENT '부모 댓글 id',
  `content` mediumtext NOT NULL COMMENT '내용',
  `name` varchar(100) NOT NULL COMMENT '작성자',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `board_id` (`board_id`),
  KEY `parent_comment_id` (`parent_comment_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='댓글';

```

```bash
CREATE TABLE `keyword_alert` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '알림 대상자 이름',
  `board_id` int(10) unsigned DEFAULT NULL COMMENT 'board.id',
  `comments_id` int(10) unsigned DEFAULT NULL COMMENT 'comments.id',
  `created_at` datetime DEFAULT current_timestamp() COMMENT '작성일시',
  KEY `id` (`id`),
  KEY `board_id` (`board_id`),
  KEY `comments_id` (`comments_id`),
  CONSTRAINT `keyword_alert_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE,
  CONSTRAINT `keyword_alert_ibfk_2` FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='키워드 알림';
```



## 게시글 목록 API
## 게시글 작성 API
## 게시글 수정 API
## 게시글 삭제 API
## 댓글 목록 API
## 댓글 작성 API
## 게시물 또는 댓글 등록 시 알림 기능 구현