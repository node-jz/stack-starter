/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, JobId, Queue } from 'bull';
import { DateTime } from 'luxon';

@Injectable()
export class TaskQueue {
  constructor(@InjectQueue('tasks') private queue: Queue) {}

  async add(type: string, user_id: string, when: DateTime) {
    const delay = when ? Math.max(0, when.diffNow('milliseconds').milliseconds) : 0;
    return this.queue.add(type, { user_id }, { jobId: `${type}-${user_id}-${when.toISODate()}`, delay: delay });
  }

  async get(job_id: JobId): Promise<Job<{ user_id: string }>> {
    const job = await this.queue.getJob(job_id);
    return job;
  }

  async getJobs(): Promise<any[]> {
    const jobs = await this.queue.getJobs(['delayed', 'waiting', 'active', 'completed', 'failed']);
    return jobs;
  }

  async cleanUp() {
    await this.queue.clean(1000, 'completed');
  }

  async cleanWaiting() {
    await this.queue.clean(1000, 'delayed');
  }

  async cleanAll() {
    await this.queue.clean(10, 'failed');
    await this.queue.clean(10, 'completed');
    await this.queue.clean(10, 'paused');
    await this.queue.clean(10, 'wait');
    await this.queue.clean(10, 'delayed');
  }

  async remove(job_id: string) {
    const job = await this.get(job_id);
    if (job) {
      await job.remove();
    }
  }
}
