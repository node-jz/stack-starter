/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.populate(process.env, { ENCRYPTION_KEY: 'at2U8i8KyAsRcpQrgNfI' });
describe('EncryptionService', () => {
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [EncryptionService], // Add
    }).compile();

    encryptionService = moduleRef.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(encryptionService).toBeDefined();
  });
  describe('encrypt and decrypt data', () => {
    it('should encrypt and decrypt data correctly', () => {
      const testData = 'Test data string';
      const userHash = 'user-specific-hash';
      const encryptedData = encryptionService.encryptData(testData, userHash);
      const decryptedData = encryptionService.decryptData(encryptedData, userHash);

      expect(decryptedData).toEqual(testData);
    });

    it('should decrypt data correctly', () => {
      const testData = '2Sj4rbiCsTUcr8a2AUicpgmAwCooGkP9VuAqVYab3bG+/Mpj5Bgn';
      const userHash = 'a3896546-18c1-4d10-9e5b-a6936037b0f8';
      const decryptedData = encryptionService.decryptData(testData, userHash);
    });
  });
});
