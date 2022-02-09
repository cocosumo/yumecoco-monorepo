

import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { BASE_URL, STORES_APITOKEN } from './../helpers/contants';

console.log(STORES_APITOKEN, BASE_URL?.includes(window.location.hostname), 'base');

const options = {
  baseUrl: BASE_URL,
  auth: BASE_URL?.includes(window.location.hostname) ? undefined : {
    apiToken: STORES_APITOKEN,
  },
};

const KintoneClient = new KintoneRestAPIClient(options);

export const APP_ID = 19;
export const KintoneRecord = KintoneClient.record;