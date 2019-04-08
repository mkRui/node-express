/**
 * @class LoginError
 * 捕获异常的登录信息
 */

 /**
  * @param {host} 可以获取上下文 的 req res
  * @param {exception} 获取controller的报错信息 或者 throw 的信息
  */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export default class LoginError implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();   // 获取请求上下文
        const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
        const request = ctx.getRequest();   // 在请求上下文中获取 request 对象
        const code = exception.getStatus() || '500';
        let message = exception.message() || '阿西吧 Error';
    
        response.status(code).json({
            message,
            time: new Date().toLocaleString(),
            path: request.url
        });
    }
}