
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { BASE_URL, CUSTOMERS_APITOKEN } from './../helpers/contants';

export const APP_ID = 173;

const options = {
  baseUrl: BASE_URL,
  auth: BASE_URL?.includes(window.location.hostname) ? undefined : {
    apiToken: CUSTOMERS_APITOKEN,
  },
};



const KintoneClient = new KintoneRestAPIClient(options);


export const KintoneRecord = KintoneClient.record;