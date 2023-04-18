import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

console.log(envPath, process.env);

export default defineConfig({
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        desktop: 'src/app.ts',
      },
      output: {
        format: 'iife',
        dir: 'dist',
        entryFileNames: '[name].js',
      },
    },
  },
});