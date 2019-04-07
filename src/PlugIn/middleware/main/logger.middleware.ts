import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {BrowserType, GetIp} from './../../utils/index'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log()
    console.log('IP: ' + GetIp(req) ,BrowserType(req.headers['user-agent']), req.method, req.headers.host + req.url)
    next();
  }
}
