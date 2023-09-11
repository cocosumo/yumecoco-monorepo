import { reminderAppIds } from '../../config';
import { IPaymentreminder, KPaymentreminder } from '../dbKintone';


export const appId = reminderAppIds.paymentReminder;
export type RecordType = IPaymentreminder;
export type RecordKey = KPaymentreminder;
