import { AppIds } from 'config';
import { IContracts, IPaymentreminder, KContracts, KPaymentreminder } from 'types';


/**アラート対象の工事種別 */
export const tgtProjType = ['新築付帯工事', 'リフォーム工事', '新築工事'] as const;
export type TgtProjType = typeof tgtProjType[number];


export const reminderAppId = AppIds.paymentReminder;
export const contractAppId = AppIds.contracts;
export const andpadPaymentsAppId = AppIds.andpadPayments;

export type ContractRecordType = IContracts;
export type ContractRecordKeys = KContracts; 

export type PaymentReminderRecordType = IPaymentreminder;
export type PaymentReminderRecordKeys = KPaymentreminder;
