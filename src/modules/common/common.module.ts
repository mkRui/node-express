import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm'

import { EmailCode } from './../../entity/email.entity'

import { emailConfig } from './../../config/emailConfig'

import { NodemailerModule } from '@mobizerg/nest-nodemailer';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailCode]),
        NodemailerModule.register(emailConfig)
    ]
    
})

export class CommonModule {}