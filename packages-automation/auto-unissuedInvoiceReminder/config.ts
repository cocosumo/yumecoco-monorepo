import { AppIds } from 'config';
import { IUnissuedinvoicealert, KUnissuedinvoicealert } from 'types';


/**モードの設定 */
export const isProd = process.env.NODE_ENV_FORCED === 'production';
console.log('chk', process.env.NODE_ENV_FORCED);


/**アプリ設定 */
export const appId = AppIds.unissuedInvoiceAlert;
export type recordType = IUnissuedinvoicealert;
export type recordKeys = KUnissuedinvoicealert;


/**chatworkのルームID */
export const chatworkRooms = {
  cocoasGroup: '335602129',
  rpaChatGroup: '213232379',
  testRoom: '225800073',
  test: '335600969',
};
