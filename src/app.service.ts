import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      message: 'Hello World!',
    });
  }

  healthCheck(): string {
    return JSON.stringify({
      message: 'up',
    });
  }
}
