import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module'

// 数据库ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './config/databaseConfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlConfig),
    UsersModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
