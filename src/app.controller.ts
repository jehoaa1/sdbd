import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App') // Swagger UI에서 태그를 정의
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello' }) // API 설명
  @ApiResponse({ status: 200, description: 'Returns a hello message.' }) // 응답 설명
  getHello(): string {
    return this.appService.getHello();
  }
}
