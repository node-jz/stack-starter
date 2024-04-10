/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntityService } from 'src/entities/user.entity';
import { EmailService } from 'src/utils/email.service';

@Injectable()
export class UserEventsService {
  constructor(protected entity: UserEntityService, protected emailService: EmailService) {}
}
