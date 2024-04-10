import { BullModule } from '@nestjs/bull';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { SlackService } from './slack/slack.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'slack',
    }),
  ],
  controllers: [],
  providers: [SlackService],
  exports: [SlackService],
})
export class IntegrationsModule {}
