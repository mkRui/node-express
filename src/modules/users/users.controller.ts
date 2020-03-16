import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  getHello(): Promise<Object> {
    return this.usersService.getHello()
  }
}
