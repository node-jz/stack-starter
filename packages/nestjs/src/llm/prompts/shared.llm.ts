/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/llm/openai.service';

@Injectable()
export class SharedLLMService {
  constructor(private openAIService: OpenAiService) {}

  async createSomethingWithLLMComplete(): Promise<string> {
    const prompt = `
    Write a paragraph about how to write LLMs.
    `;
    const res = await this.openAIService.completion(prompt, null, true);
    return JSON.parse(res.content);
  }

  async createSomethingWithLLMChat(): Promise<{ paragraph: string; keywords: string[] }> {
    const prompt = `
    Write a paragraph about how to write LLMs. And keywords for SEO.

    [OUTPUT]
    return as JSON with type {paragraph: string, keywords: string[]}
    `;
    const res = await this.openAIService.completion(prompt, null, true);
    return JSON.parse(res.content);
  }
}
