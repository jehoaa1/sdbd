import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordAlertModule } from './module/keywordAlert/keyword_alert.module';
import { BoardModule } from './module/board/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: 'Z',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      logging: true, // 쿼리 로깅 활성화
    }),
    KeywordAlertModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
