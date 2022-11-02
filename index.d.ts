declare module 'npm-run-all';
declare module '*.css'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module 'koyomi'


declare namespace NodeJS {
  export interface ProcessEnv {
    KT_BASE_URL: string;
    KT_CLIENT_ID: string;
    KT_AUTH_CODE: string;
  }
}
