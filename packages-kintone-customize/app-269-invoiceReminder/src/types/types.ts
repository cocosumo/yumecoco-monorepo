import { IPaymentReminder, KPaymentReminder } from '../../../../packages-automation/auto-paymentAlert/config';

export interface KintoneEvent {
  record: IInvoiceReminder,
  appId: string,
  recordId: string,
  error: string,
}

export type KeyOfDB = KInvoiceReminder;
