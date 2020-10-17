import { EncryptionTransformer } from 'typeorm-encrypted';

export const encryptionTransformer = new EncryptionTransformer({
  key: `${process.env.CRYPT_KEY}`,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: process.env.CRYPT_IV,
});
