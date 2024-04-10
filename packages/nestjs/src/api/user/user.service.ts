/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEntityService } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(protected entity: UserEntityService, protected eventEmitter: EventEmitter2) {}
}
