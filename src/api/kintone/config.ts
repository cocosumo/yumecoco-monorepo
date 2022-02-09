import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { BASE_URL } from './helpers/contants';

/* Use session authentication */



const KintoneClient = new KintoneRestAPIClient(
  {
    baseUrl: BASE_URL,
  },

  // Omitted auth to use session authentication
);

export const KintoneRecord = KintoneClient.record;

export default KintoneClient;