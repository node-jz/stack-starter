import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';

import { User, UserEntityService } from './user.entity';
import { Company, CompanyEntityService } from './company.entity';
import { Generation, GenerationEntityService } from './generation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Generation, User]), UtilsModule],
  providers: [CompanyEntityService, GenerationEntityService, UserEntityService],
  exports: [CompanyEntityService, GenerationEntityService, UserEntityService],
})
export class EntitiesModule {}
