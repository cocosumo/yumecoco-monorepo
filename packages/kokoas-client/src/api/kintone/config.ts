import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { isBrowser } from '../../helpers/utils';

/* Use session authentication */

const options = {
  baseUrl: process.env.KT_BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [
      process.env.KT_CUSTOMER,
      process.env.KT_STORE,
      process.env.KT_EMPLOYEE,
      process.env.KT_CUST_GROUP,
      process.env.KT_CUST_MEMO,
      process.env.KT_PROJECT_TYPE,
      process.env.KT_PROJECTS,
      process.env.KT_ESTIMATE,
      process.env.KT_INVOICE,
    ],
  },
};

/**
 * @deprecated 変わりにconfig/AppIds を利用する。
 * 環境によって設定が変わるので、全てのパッケージと共有するためです。
 */
export enum APPIDS {
  customers = 173,
  stores = 19,
  employees = 34,
  custGroup = 185,
  custMemo = 181,

  /** @deprecated Use projType instead */
  constructionType = 190,

  /** @deprecated Use project instead */
  constructionDetails = 194,

  projType = 190,
  project = 194,
  projectEstimate = 202,
  Invoice = 204,
}

/**
 * @deprecated
 * */
export const KintoneClient = new KintoneRestAPIClient(options);

/**
 * @deprecated api-kintoneのAPIを利用するか、追加する。
 * 当パッケージでKintoneSDKを直接アクセスしない方向です
 * 他パッケージと共有し、汎用性と保守性の向上に繋がります。
 *  */
export const KintoneRecord = KintoneClient.record;
