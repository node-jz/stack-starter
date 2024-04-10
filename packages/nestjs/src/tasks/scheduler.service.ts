/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, Timeout } from '@nestjs/schedule';
import { DateTime } from 'luxon';

import { TasksService } from './tasks.service';

@Injectable()
export class SchedulerService {
  constructor(protected taskService: TasksService) {}

  
}
