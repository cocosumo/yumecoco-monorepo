import { IInvoiceReminder, KInvoiceReminder } from '../../../../packages-automation/auto-invoiceAlert/config';


export interface KintoneEvent {
  record: IInvoiceReminder,
  appId: string,
  recordId: string,
  error: string,
}

export type KeyOfDB = KInvoiceReminder;
