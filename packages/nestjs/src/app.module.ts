import { LlmModule } from './llm/llm.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { UtilsModule } from './utils/utils.module';
import { ApiModule } from './api/api.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    EventEmitterModule.forRoot(),
    UtilsModule,
    EntitiesModule,
    LlmModule,
    ApiModule,
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    ScheduleModule.forRoot(),
    TasksModule,
    IntegrationsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
