import { Module, NestModule, RequestMethod} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserJurisdiction } from './../../entity/role.entity'

import { UsersService } from './users.service';

import { UserController } from './users.controller';


@Module({
    imports: [TypeOrmModule.forFeature([UserJurisdiction])],
    providers: [UsersService],
    controllers: [
        UserController
    ],
    exports: [UsersService]
})
export class UsersModele { }