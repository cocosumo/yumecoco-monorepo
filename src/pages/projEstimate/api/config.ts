import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { isBrowser } from '../../../helpers/utils';

const options = {
  baseUrl: process.env.BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [
      process.env.API_CONSTRUCTION_TYPE,
      process.env.API_ESTIMATE_MAJORITEMS,
      process.env.API_ESTIMATE_MIDDLEITEMS,
      process.env.API_ESTIMATE_ELEMENTS,

    ],
  },
};

export enum EstimateAppId {
  majourItems = 67,
  middleItems = 68,
  elements = 69,
}

/**
 * レコード一括取得時のオプション設定
 */
export const estimateFields = {
  majourItems: {
    fields: ['レコード番号', '大項目名'],
    query: undefined,
  },
  middleItems: {
    fields: ['レコード番号', '大項目', '中項目名'],
    query: 'レコード番号 < 10',
  },
  elements: {
    fields: ['部材名', '原価', '単位'],
    query: 'レコード番号 < 10',
  }, 
};

export const KintoneClient = new KintoneRestAPIClient(options);

export const KintoneEstimateRecord = KintoneClient.record;

export default KintoneClient;