export const MyEncryptionTransformerConfig = {
  key: process.env.ENCRYPTION_KEY,
  algorithm: 'aes-128-cbc',
  ivLength: 16
};