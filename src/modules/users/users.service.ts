import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';

// 数据库模型
import { UserJurisdiction } from './../../entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserJurisdiction)
    private readonly userRepository: Repository<UserJurisdiction>
  ) {}


  async getHello() {
  }
}
