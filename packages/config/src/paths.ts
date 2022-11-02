import * as path from 'path';
import * as dotenv from 'dotenv';

export const envPath = path.join(__dirname, '../../../../.env'); 
console.log(envPath);
export const loadEnv = () => dotenv.config({ path: envPath });