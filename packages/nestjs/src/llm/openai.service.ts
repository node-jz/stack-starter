import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import OpenAI from 'openai';
import { Generation, GenerationDto } from 'src/entities/generation.entity';
@Injectable()
export class OpenAiService {
  openai = new OpenAI();
  constructor(protected eventEmitter: EventEmitter2) {}

  async completion(prompt: string, model: string = null, json = false, tokenTracking: GenerationDto = null) {
    model = model ?? 'gpt-4-turbo-preview';

    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: json ? 'json_object' : 'text' },
      model: model,
    });

    if (response.choices.length > 0 && tokenTracking) {
      const generationDto: Partial<Generation> = {
        ...tokenTracking,
        input: response.usage.prompt_tokens,
        output: response.usage.completion_tokens,
        total: response.usage.total_tokens,
        output_length: response.choices[0].message.content.length,
      };
      this.eventEmitter.emit('generation.completed', generationDto);
    }
    return response.choices[0].message;
  }

  async chat(system: string, prompt: string, model: string | null = null, json = false, tokenTracking: GenerationDto = null) {
    model = model ?? 'gpt-4-turbo-preview';

    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
      response_format: { type: json ? 'json_object' : 'text' },
      model: model,
    });
    if (response.choices.length > 0 && tokenTracking) {
      const generationDto: Partial<Generation> = {
        ...tokenTracking,
        input: response.usage.prompt_tokens,
        output: response.usage.completion_tokens,
        total: response.usage.total_tokens,
        output_length: response.choices[0].message.content.length,
      };
      this.eventEmitter.emit('generation.completed', generationDto);
    }
    return response.choices[0].message;
  }
}
