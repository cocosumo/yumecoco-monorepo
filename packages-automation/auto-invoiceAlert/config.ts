import { AppIds, isProd } from 'config';
import { IContracts, KContracts } from 'types';



/**アラート対象の工事種別 */
export const tgtProjType = ['新築付帯工事', 'リフォーム工事', '新築工事'] as const;
export type TgtProjType = typeof tgtProjType[number];



/**アプリIDの設定 */
export const prodAppIds = 269;
export const devAppIds = 268;
export const reminderAppId = isProd ? prodAppIds : devAppIds;

export const contractAppId = AppIds.contracts;
export const andpadPaymentsAppId = AppIds.andpadPayments;



/**kintoneレコードタイプ、レコードキーの設定 */
export type ContractRecordType = IContracts;
export type ContractRecordKeys = KContracts;

export type IPaymentReminder = DBPaymentreminder.SavedData;
export type KPaymentReminder = keyof IPaymentReminder;



/**chatworkのルームID */
export const chatworkRooms = {
  cocoasGroup: '335602129',
  test: '335600969',
};
