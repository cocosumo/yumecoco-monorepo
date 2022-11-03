
import dotenv from 'dotenv';
import path from 'path';
export const envPath = path.join(__dirname, './../../../../.env'); 
console.log('ENV', __dirname, envPath);
export const loadEnv = () => dotenv.config({ path: envPath });