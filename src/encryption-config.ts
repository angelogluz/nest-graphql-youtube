export const MyEncryptionTransformerConfig = {
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16
};