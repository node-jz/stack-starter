/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { LlmModule } from 'src/llm/llm.module';
import { UtilsModule } from 'src/utils/utils.module';

import { UserController } from './user.controller';
import { UserEventsService } from './user.events';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule, UtilsModule, LlmModule],
  controllers: [UserController],
  providers: [UserService, UserEventsService],
  exports: [UserService],
})
export class UserModule {}
