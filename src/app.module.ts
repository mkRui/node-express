import { Module } from '@nestjs/common';
import { AppController } from './Controller/app.controller';
import { AppService } from './Provider/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
