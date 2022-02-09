
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { BASE_URL, EMPLOYEES_TOKEN } from './../helpers/contants';

export const APP_ID = 34;

const options = {
  baseUrl: BASE_URL,
  auth: BASE_URL?.includes(window.location.hostname) ? undefined : {
    apiToken: EMPLOYEES_TOKEN,
  },
};

const KintoneClient = new KintoneRestAPIClient(options);


export const KintoneRecord = KintoneClient.record;