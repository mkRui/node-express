import { Injectable } from '@nestjs/common';

import { InjectTransport } from '@mobizerg/nest-nodemailer';

import { InjectRepository } from '@nestjs/typeorm'

import { Repository, getRepository } from 'typeorm'

import { SentMessageInfo } from 'nodemailer';

// 数据库模型
import { EmailCode } from './../../entity/email.entity';

class Email {
    constructor(
        @InjectRepository(EmailCode)
        private readonly EmailRepository: Repository<EmailCode>
    ) {}
}

/**
 * 发送邮件
 * 校验邮件
 */

@Injectable()
export class EmailService {
    @InjectRepository(EmailCode)
    private readonly EmailRepository: Repository<EmailCode>


    sendEmail () {
        
    }
}
