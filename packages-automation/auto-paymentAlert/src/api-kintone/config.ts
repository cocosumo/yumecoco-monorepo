import { reminderAppId } from '../../config';
import { IPaymentreminder, KPaymentreminder } from '../dbKintone';


export const appId = reminderAppId;
export type RecordType = IPaymentreminder;
export type RecordKey = KPaymentreminder;
