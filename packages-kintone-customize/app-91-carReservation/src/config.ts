import { getAppId } from 'api-kintone';

export const prodAppId = 91;
export const currAppId = getAppId();

export const isProd = currAppId === prodAppId;

export const constIndexViewId = isProd ? 5533779 : 5533776;

export const notifEmail = isProd 
  ? process.env.reportEmail 
  : process.env.reportEmailDev;

export const baseUrl = isProd
  ? process.env.BASE_URL
  : process.env.LOCAL_URL;

export const apiKey = process.env.SERVER_API_KEY;

console.log('Running in', isProd ? 'production' : 'development');
console.log('Notifications will go to', notifEmail);
console.log('Connected to', baseUrl);