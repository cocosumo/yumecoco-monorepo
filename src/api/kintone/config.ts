import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { BASE_URL, CUSTOMERS_APITOKEN, STORES_APITOKEN, EMPLOYEES_TOKEN, CUST_GROUP_APITOKEN } from './helpers/constants';
import { isBrowser } from '../../helpers/utils';

/* Use session authentication */

const options = {
  baseUrl: BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [
      CUSTOMERS_APITOKEN,
      STORES_APITOKEN,
      EMPLOYEES_TOKEN,
      CUST_GROUP_APITOKEN,
    ],
  },
};


const KintoneClient = new KintoneRestAPIClient(options,
);

export const KintoneRecord = KintoneClient.record;

export default KintoneClient;