import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from 'src/auth/strategies/google.strategy';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Repository } from 'typeorm';

import { Base } from './_base.entity';
import { User } from './user.entity';

@Entity()
export class Company extends Base {
  @Column('text', { unique: true, nullable: true })
  name: string;

  @Column('text')
  url: string;

  @ManyToOne(() => User, (user) => user.company)
  user: User[];
}
export type CompanyResponse = Omit<Company, 'created_at' | 'updated_at'> & {
  created_at: string;
  updated_at: string;
};

export type CompanyCreateDto = {
  name: string;
  url: string;
};

export type CompanyUpdateDto = Partial<Pick<Company, 'name' | 'url'>>;

@Injectable()
export class CompanyEntityService extends TypeOrmCrudService<Company> {
  constructor(
    @InjectRepository(Company)
    repo: Repository<Company>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repo);
  }

  create(dto: Partial<Company>) {
    return this.repo.save(dto);
  }

  async update(id: string, dto: Partial<Company>): Promise<Company> {
    await this.repo.save(Object.assign(dto, { id: id }));
    return this.findOne({ where: { id: id } });
  }
}
