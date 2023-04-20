import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('HomePage') //specifies a tag for this endpoint which is used in the Swagger UI to group endpoints by tag.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
