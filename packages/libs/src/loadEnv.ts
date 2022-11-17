
import dotenv from 'dotenv';
import path from 'path';


export const loadEnv = () => {

  if (!process.env.KT_BASE_URL) {
    const envpath = path.join(__dirname, './../../../.env');
    dotenv.config({
      path: envpath,
    });
  }
};