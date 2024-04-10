// src/common/decorators/encrypt.decorator.ts
import 'reflect-metadata';

export const ENCRYPT_METADATA_KEY = Symbol('ENCRYPT_METADATA_KEY');

export function Encrypt(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    const existingEncryptedFields = Reflect.getMetadata(ENCRYPT_METADATA_KEY, target) || [];
    Reflect.defineMetadata(ENCRYPT_METADATA_KEY, [...existingEncryptedFields, propertyKey], target);
  };
}
