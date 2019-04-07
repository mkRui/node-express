/**
 * 获取请求 ip 内容
 * @class GetIp
 * @param req
 */
import { Request, Response } from 'express';

export default function GetIp (req: Request): string {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress) as string
}