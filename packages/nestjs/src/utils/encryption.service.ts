// encryption.service.ts
import { Injectable } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';
import { ENCRYPT_METADATA_KEY } from './decorators/encrypt.decorator';
export interface EntityClassMap {
  [key: string]: { new (): any };
}
@Injectable()
export class EncryptionService {
  private alg = 'aes-256-ctr';
  private envKey = process.env.ENCRYPTION_KEY; // Ensure this environment variable is set

  private getKey(userHash: string) {
    return createHash('sha256')
      .update(String(this.envKey + userHash))
      .digest('base64')
      .substring(0, 32);
  }

  encryptDto<T>(dto: Partial<T>, entityClass: { new (): T }, userId: string, entityClassMap?: EntityClassMap): Partial<T> {
    const encryptedFields: string[] = Reflect.getMetadata(ENCRYPT_METADATA_KEY, entityClass.prototype) || [];

    for (const field of encryptedFields) {
      if (dto[field] == undefined || dto[field] == null || dto[field] == '') {
        continue;
      }

      if (Array.isArray(dto[field])) {
        dto[field] = dto[field].map((item) => {
          if (typeof item === 'object' && item !== null && !(item instanceof Date)) {
            const itemType = entityClassMap?.[field] || Object.getPrototypeOf(item).constructor;
            return this.encryptDto(item, itemType, userId, entityClassMap);
          }
          return item;
        });
      } else if (typeof dto[field] === 'object' && dto[field] !== null && !(dto[field] instanceof Date)) {
        const fieldType = entityClassMap?.[field];
        if (fieldType && Reflect.getMetadata(ENCRYPT_METADATA_KEY, fieldType.prototype)) {
          dto[field] = this.encryptDto(dto[field], fieldType, userId, entityClassMap);
        }
      } else {
        dto[field] = this.encryptData(dto[field], userId);
      }
    }

    return dto;
  }

  encryptData(data: string, userHash: string): string {
    const key = this.getKey(userHash);
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.alg, key, iv);
    const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    return result.toString('base64');
  }

  decryptEntity<T>(entity: T, entityClass: { new (): T }, userId: string, entityClassMap?: EntityClassMap): T {
    const encryptedFields: string[] = Reflect.getMetadata(ENCRYPT_METADATA_KEY, entityClass.prototype) || [];

    for (const field of encryptedFields) {
      if (entity[field] == undefined || entity[field] == null || entity[field] == '') {
        continue;
      }
      if (Array.isArray(entity[field])) {
        entity[field] = entity[field].map((item) => {
          const fieldType = entityClassMap?.[field];
          if (fieldType && Reflect.getMetadata(ENCRYPT_METADATA_KEY, fieldType.prototype)) {
            return this.decryptEntity(item, fieldType, userId, entityClassMap);
          }
          return item;
        });
      } else if (typeof entity[field] === 'object' && entity[field] !== null) {
        const fieldType = entityClassMap?.[field];
        if (fieldType && Reflect.getMetadata(ENCRYPT_METADATA_KEY, fieldType.prototype)) {
          entity[field] = this.decryptEntity(entity[field], fieldType, userId, entityClassMap);
        }
      } else {
        entity[field] = this.decryptData(entity[field], userId);
      }
    }

    return entity;
  }

  decryptData(data: string, userHash: string): string {
    if (data == '' || data == undefined || data == null) {
      return data;
    }
    const key = this.getKey(userHash);
    const bufferData = Buffer.from(data, 'base64');
    const iv = bufferData.slice(0, 16);
    const encryptedData = bufferData.slice(16);
    const decipher = createDecipheriv(this.alg, key, iv);
    const result = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return result.toString();
  }
}
