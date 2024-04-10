/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';

import { OpenAiService } from './openai.service';
import { SharedLLMService } from './prompts/shared.llm';
import { EmbeddingsService } from './embeddings.service';

@Module({
  imports: [EntitiesModule],
  controllers: [],
  providers: [OpenAiService, SharedLLMService, EmbeddingsService],
  exports: [OpenAiService, SharedLLMService, EmbeddingsService],
})
export class LlmModule {}
