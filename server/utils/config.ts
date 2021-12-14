import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 8;
export const JWT_SECRET = process.env.JWT_SECRET || 'very secret';
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI =
  NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
