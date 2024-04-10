import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from 'src/auth/strategies/google.strategy';
import { Column, Entity, JoinColumn, OneToMany, Repository } from 'typeorm';
import { Base } from './_base.entity';
import { Company } from './company.entity';

@Entity()
export class User extends Base {
  @Column('text', { unique: true, nullable: true })
  google_id: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  picture_url: string;

  @Column('uuid', { default: null, nullable: true })
  company_id: string;

  @OneToMany(() => Company, (company) => company.user)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
export type UserResponse = Omit<User, 'created_at' | 'updated_at'> & {
  created_at: string;
  updated_at: string;
};

export type UserCreateDto = {
  google_id: string;
  email: string;
  name: string;
};

export type UserUpdateDto = Partial<Pick<User, 'google_id' | 'name' | 'email'>>;

@Injectable()
export class UserEntityService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repo);
  }

  async createOrReturnUser(googleUser: GoogleUser): Promise<User> {
    let user = await this.findOne({ where: { google_id: googleUser.googleId } });
    if (!user) {
      user = await this.create({
        google_id: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        picture_url: googleUser.picture,
      });

      this.eventEmitter.emit('slack.add', `*${user.name}* just joined!:\n`);
    } else {
      await this.update(user.id, {
        picture_url: googleUser.picture,
      });
    }
    return this.findOne({ where: { id: user.id }, relations: ['company'] });
  }

  create(dto: Partial<User>) {
    return this.repo.save(dto);
  }

  async update(id: string, dto: Partial<User>): Promise<User> {
    await this.repo.save(Object.assign(dto, { id: id }));
    return this.findOne({ where: { id: id } });
  }
}
