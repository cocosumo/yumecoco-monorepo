import { IPaymentReminder, KPaymentReminder } from '../../../../packages-automation/auto-paymentAlertV2/config';

export interface KintoneEvent {
  record: IPaymentReminder,
  appId: string,
  recordId: string,
  error: string,
}

export type KeyOfDB = KPaymentReminder;
