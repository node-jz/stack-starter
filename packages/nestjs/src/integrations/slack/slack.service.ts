/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { InjectQueue, OnGlobalQueueCompleted, OnGlobalQueueResumed, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Job, JobId, Queue } from 'bull';

@Injectable()
@Processor('slack')
export class SlackService {
  constructor(private httpService: HttpService, @InjectQueue('slack') private slackQueue: Queue) {}

  @OnEvent('slack.add')
  async add(message: string): Promise<Job<string>> {
    return await this.slackQueue.add('send', message, { removeOnComplete: true, removeOnFail: true });
  }

  @Process('send')
  async sendMessage(job: Job<string>) {
    if (process.env.NODE_ENV != 'production') {
      console.log(job.data);
      console.info(`Not logging to Slack in ${process.env.NODE_ENV}`);
      return;
    }
    if (!process.env.SLACK_WEBHOOK_URL) {
      console.info('No Slack Webhook configured.');
    }
    try {
      await this.httpService
        .post(
          process.env.SLACK_WEBHOOK_URL,
          { text: job.data },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: JobId, result: any) {
    console.log('(Global) on completed: Slack job ', jobId, ' -> result: ', result);
  }

  @OnGlobalQueueResumed()
  async onQueueResumed() {
    console.log('Slack Queue ready');
  }
}
