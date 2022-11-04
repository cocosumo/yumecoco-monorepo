import { findUpSync } from 'find-up';
import dotenv from 'dotenv';


export const loadEnv = () => {
  console.log('Checking if env is already loaded.');
  if (!process.env.KT_BASE_URL) {
    const envpath = findUpSync('.env');
    console.log(`Found .env at:  ${envpath}`);
    dotenv.config({
      path: envpath,
    });
  }
};