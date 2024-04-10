/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';

describe('EmailService', () => {
    let emailService: EmailService;

beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [], // Add
        controllers: [], // Add
        providers: [],   // Add
    }).compile();

    emailService = moduleRef.get<EmailService>(EmailService);
    });

it('should be defined', () => {
    expect(emailService).toBeDefined();
    });
});
