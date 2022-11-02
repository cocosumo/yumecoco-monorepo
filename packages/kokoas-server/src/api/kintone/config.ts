import {KintoneRestAPIClient} from '@kintone/rest-api-client';

const options = {
  baseUrl: process.env.KT_BASE_URL,
  auth: {
    apiToken: [
      process.env.KT_CUST_GROUP,
      process.env.KT_PROJECT,
      process.env.KT_ESTIMATE,
      process.env.KT_CUSTOMER,
      process.env.KT_EMPLOYEE,
    ],
  },
};

console.log(process.env.node_env);

export enum APPIDS {
  customers = 173,
  stores = 19,
  employees = 34,
  custGroup = 185,
  custMemo = 181,
  constructionType = 190,
  projectDetails = 194,
  projEstimate = 202

}


export const KintoneClient = new KintoneRestAPIClient(options);

export const KintoneRecord = KintoneClient.record;

export default KintoneClient;
