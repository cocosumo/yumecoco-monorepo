import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { AppIds } from 'config';
import { isBrowser } from '../../../helpers/utils';

const options = {
  baseUrl: process.env.BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [
      process.env.KT_PROJECT_TYPE,
      process.env.KT_ESTIMATE_MAJORITEMS,
      process.env.KT_ESTIMATE_MIDDLEITEMS,
      process.env.KT_ESTIMATE_ITEMS,

    ],
  },
};

export enum EstimateAppId {
  majourItems = AppIds.materialsMajor,
  middleItems = AppIds.materialsMid,
  elements = AppIds.materialsItem,
}

export type KEstimateAppId = keyof typeof EstimateAppId;

export const KintoneClient = new KintoneRestAPIClient(options);

export const KintoneEstimateRecord = KintoneClient.record;

export default KintoneClient;