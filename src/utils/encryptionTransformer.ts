import { EncryptionTransformer } from 'typeorm-encrypted';
import * as dotenv from 'dotenv';
dotenv.config();

export const encryptionTransformer = new EncryptionTransformer({
  key: `${process.env.CRYPT_KEY}`,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: `${process.env.CRYPT_IV}`,
});
