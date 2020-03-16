import { Controller, Get } from '@nestjs/common';

import { EmailService } from './common.service';

@Controller('common')
export class UserController {
  constructor(
      private readonly EmailService: EmailService
  ) {}
}