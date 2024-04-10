import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingsService {
  openai = new OpenAI();
  constructor(protected eventEmitter: EventEmitter2) {}

  async chunkAndEmbed(
    text: string,
    chunkSize = 2000,
    chunkOverlap = 200,
  ): Promise<{ embeddings: number[][]; docs: Document<Record<string, any>>[] }> {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    });

    const docs = await splitter.createDocuments([text]);

    /* Create instance */
    const embeddingsTool = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    const embeddings = await embeddingsTool.embedDocuments(docs.map((d) => d.pageContent));
    return {
      embeddings: embeddings,
      docs: docs,
    };
  }

  async makeEmbeddings(text: string) {
    const embeddingsTool = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    return embeddingsTool.embedDocuments([text]);
  }
}
