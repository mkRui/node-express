import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModele } from './modules/users/users.module';

// 数据库ORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './config/databaseConfig';
@Module({
  imports: [TypeOrmModule.forRoot(MysqlConfig), UsersModele],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
