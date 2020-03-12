import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  getHello(): string {
    return this.usersService.getHello();
  }
}
