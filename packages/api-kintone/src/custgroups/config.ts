import { AppIds } from 'config';
import { ICustgroups, KCustgroups } from 'types';

export const appId = AppIds.custGroups;

export type RecordType = ICustgroups;

export type RecordKey =  KCustgroups 
| keyof ICustgroups['members']['value'][number]['value'];
