import { IPaymentReminder, KPaymentReminder } from '../../../../packages-automation/auto-paymentAlert/config';

export interface KintoneEvent {
  record: IPaymentReminder,
  appId: string,
  recordId: string,
  error: string,
}

export type KeyOfDB = KPaymentReminder;
