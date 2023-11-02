import { AppIds, isProd } from 'config';



/**アラート対象の工事種別 */
export const tgtProjType = ['新築付帯工事', 'リフォーム工事', '新築工事'] as const;
export type TgtProjType = typeof tgtProjType[number];



/**アプリIDの設定 */
export const prodAppIds = 261;
export const devAppIds = 249;
export const reminderAppId = isProd ? prodAppIds : devAppIds;

export const contractAppId = AppIds.contracts;
export const andpadPaymentsAppId = AppIds.andpadPayments;



/**kintoneレコードタイプ、レコードキーの設定 */
export type IPaymentReminder = DBPaymentreminder.SavedData;
export type KPaymentReminder = keyof IPaymentReminder;



/**chatworkのルームID */
export const chatworkRooms = {
  cocoasGroup: '335602129',
  rpaChatGroup: '213232379',
  testRoom: '225800073',
  test: '335600969',
};
