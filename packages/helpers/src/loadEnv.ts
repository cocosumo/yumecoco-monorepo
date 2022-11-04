
import dotenv from 'dotenv';
import path from 'path';


export const loadEnv = () => {
  console.log('Checking if env is already loaded.');
  if (!process.env.KT_BASE_URL) {
    const envpath = path.join(__dirname, './../../../.env');
    console.log(`Found .env at:  ${envpath}`);
    dotenv.config({
      path: envpath,
    });
  }
};