/* https://docs.nestjs.com/modules */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
