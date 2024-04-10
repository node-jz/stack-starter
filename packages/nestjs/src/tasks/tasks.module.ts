import { BullModule } from '@nestjs/bull';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { LlmModule } from 'src/llm/llm.module';
import { UtilsModule } from 'src/utils/utils.module';

import { TaskProcessor } from './queues/task.processor';
import { TaskQueue } from './queues/task.queue';
import { SchedulerService } from './scheduler.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tasks',
    }),
    EntitiesModule,
    LlmModule,
    UtilsModule,
  ],
  controllers: [TasksController],
  providers: [SchedulerService, TasksService, TaskQueue, TaskProcessor],
  exports: [TaskQueue],
})
export class TasksModule {}
