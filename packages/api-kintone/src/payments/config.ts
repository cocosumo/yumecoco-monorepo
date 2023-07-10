import { AppIds } from 'config';
import { IPayments, KPayments } from 'types';


export const appId = AppIds.payments;
export type RecordType = IPayments;
export type RecordKey = KPayments;
export const dataIdPadding = 2;