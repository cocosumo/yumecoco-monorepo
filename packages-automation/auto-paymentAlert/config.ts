import { AppIds, isProd } from 'config';
import { IContracts, KContracts } from 'types';
import { IPaymentreminder, KPaymentreminder } from './src/dbKintone';


/**アラート対象の工事種別 */
export const tgtProjType = ['新築付帯工事', 'リフォーム工事', '新築工事'] as const;
export type TgtProjType = typeof tgtProjType[number];

export const prodAppIds = 261;
export const devAppIds = 249;

export const reminderAppId = isProd ? prodAppIds : devAppIds;

export const contractAppId = AppIds.contracts;
export const andpadPaymentsAppId = AppIds.andpadPayments;

export type ContractRecordType = IContracts;
export type ContractRecordKeys = KContracts;

export type PaymentReminderRecordType = IPaymentreminder;
export type PaymentReminderRecordKeys = KPaymentreminder;

/**
 * chatworkのルームID
 */
export const chatworkRooms = {
  cocoasGroup: '335602129',
  test: '335600969',
};
