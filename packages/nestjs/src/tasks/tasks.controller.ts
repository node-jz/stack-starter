/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('tasks')
export class TasksController {
  constructor(private eventEmitter: EventEmitter2) {}
}
