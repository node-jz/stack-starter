import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Encrypt } from 'src/utils/decorators/encrypt.decorator';
import { Column, Entity, JoinColumn, ManyToOne, Repository } from 'typeorm';

import { Base } from './_base.entity';
import { User } from './user.entity';

@Entity()
export class Generation extends Base {
  @Column('int')
  input: number;

  @Column('int')
  output: number;

  @Column('int')
  total: number;

  @Column('int')
  output_length: number;

  @Column('text', { default: null, nullable: true })
  type: string;

  @Column('uuid', { default: null, nullable: true })
  user_id: string;

  @Encrypt()
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export type GenerationResponse = Omit<Generation, 'created_at' | 'updated_at'> & {
  created_at: string;
  updated_at: string;
};

export type GenerationDto = Partial<Pick<Generation, 'user_id' | 'type'>>;

export type GenerationUpdateDto = Partial<Pick<GenerationResponse, 'id'>>;

@Injectable()
export class GenerationEntityService extends TypeOrmCrudService<Generation> {
  constructor(
    @InjectRepository(Generation)
    repo: Repository<Generation>,
  ) {
    super(repo);
  }

  @OnEvent('generation.completed')
  create(dto: Partial<Generation>) {
    return this.repo.save(dto);
  }

  async update(id: string, dto: Partial<Generation>) {
    const entity = await this.findOne({ where: { id: id }, select: ['id', 'user_id'] });
    await this.repo.save(Object.assign(dto, { id: id }));
    return this.findOne({ where: { id: id } });
  }
}
