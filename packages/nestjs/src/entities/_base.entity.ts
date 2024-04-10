import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ApiProperty } from '@dataui/crud/lib/crud';
import { ENCRYPT_METADATA_KEY } from 'src/utils/decorators/encrypt.decorator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type DecryptionFields<T> = Array<keyof T>;

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;
}
