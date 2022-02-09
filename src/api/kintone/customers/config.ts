
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { isBrowser } from '../../../helpers/utils';
import { BASE_URL, CUSTOMERS_APITOKEN, STORES_APITOKEN } from './../helpers/contants';

export const APP_ID = 173;

const options = {
  baseUrl: BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [CUSTOMERS_APITOKEN, STORES_APITOKEN],
  },
};

console.log(STORES_APITOKEN);



const KintoneClient = new KintoneRestAPIClient(options);


export const KintoneRecord = KintoneClient.record;