import { EncryptionTransformer } from 'typeorm-encrypted';

export const MyEncryptionTransformerConfig = new EncryptionTransformer({
  key: `${process.env.DB_KEY}`,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: process.env.DB_IV,
})
