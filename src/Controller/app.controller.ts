import { Controller, Get } from '@nestjs/common';
import { AppService } from './../Provider/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(1)
    return this.appService.getHello();
  }
}