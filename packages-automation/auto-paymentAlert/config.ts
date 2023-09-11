import { AppIds, isProd } from 'config';
import { IContracts, KContracts } from 'types';
import { IPaymentreminder, KPaymentreminder } from './src/dbKintone';


/**アラート対象の工事種別 */
export const tgtProjType = ['新築付帯工事', 'リフォーム工事', '新築工事'] as const;
export type TgtProjType = typeof tgtProjType[number];

export const prodAppIds = {
  paymentReminder: 261,
};
export const devAppIds = {
  paymentReminder: 249,
};

export const reminderAppIds = {
  ...(isProd ? prodAppIds : devAppIds),
} as const;

export const contractAppId = AppIds.contracts;
export const andpadPaymentsAppId = AppIds.andpadPayments;

export type ContractRecordType = IContracts;
export type ContractRecordKeys = KContracts;

export type PaymentReminderRecordType = IPaymentreminder;
export type PaymentReminderRecordKeys = KPaymentreminder;
