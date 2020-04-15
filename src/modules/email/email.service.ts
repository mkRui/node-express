import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'

import { Repository, getRepository } from 'typeorm'

// 数据库模型
import { EmailCode } from './../../entity/email.entity'

@Injectable()
export class EmailService {
    constructor (
        @InjectRepository(EmailCode)
        private readonly userRepository: Repository<EmailCode>
    ) {}
    
    
    
}