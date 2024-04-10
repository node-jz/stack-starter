/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EncryptionService } from './encryption.service';
@Module({
  imports: [],
  controllers: [],
  providers: [EmailService, EncryptionService],
  exports: [EmailService, EncryptionService],
})
export class UtilsModule {}
