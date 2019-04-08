import { Controller, Get, UseFilters, UsePipes, Query } from '@nestjs/common';
import { AppService } from './../Provider/app.service';
import { LoginError } from './../PlugIn/Exception';
import { OriginalPipe } from './../PlugIn/Pipe';
import { ErrorMessage } from './../PlugIn/Utils'
import { appState } from './app.controller.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(new LoginError())
  @UsePipes(new OriginalPipe())
  getHello(@Query() state: appState): string {
    // throw new ErrorMessage(500, '我就是想报错')
    console.log(state)
    return this.appService.getHello();
  }
}