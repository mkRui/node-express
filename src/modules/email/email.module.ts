import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailCode } from './../../entity/email.entity'

import { EmailController } from './email.controller'

import { EmailService } from './email.service'

@Module({
    imports: [TypeOrmModule.forFeature([EmailCode])],
    providers: [EmailService],
    controllers: [
        EmailController
    ],
    exports: [EmailService]
})

export class EmailModule {}