import { OnGlobalQueueCompleted, OnGlobalQueueResumed, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, JobId } from 'bull';

import { TasksService } from '../tasks.service';
import { TaskQueue } from './task.queue';

@Injectable()
@Processor('tasks')
export class TaskProcessor {
  constructor(protected tasksService: TasksService, protected taskQueue: TaskQueue) {}

  @Process('thing')
  /**
   * Job should have type of whatever data you put into the queue
   */
  async processThing(job: Job<{ user_id: string }>) {
    console.log('PROCESS A THING');
    return job.id + ' sent';
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: JobId, result: any) {
    const job = await this.taskQueue.get(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
  }

  @OnGlobalQueueResumed()
  async onQueueResumed() {
    console.log('Queue ready');
  }
}
