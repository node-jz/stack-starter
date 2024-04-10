/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntityService } from 'src/entities/user.entity';
import { EmailService } from 'src/utils/email.service';

import { TaskQueue } from './queues/task.queue';

@Injectable()
export class TasksService {
  constructor(private emailService: EmailService, private userEntityService: UserEntityService, private taskQueue: TaskQueue) {}
}
