import { KeyOfSubtable } from '../utils';
import { ICustgroups, KCustgroups } from './../dbKintone';

export type KCustGroupMembers = KeyOfSubtable<ICustgroups['members']>; 
export type KCustGroupAgents = KeyOfSubtable<ICustgroups['agents']>; 

export type KFlatCustGroup = 
| KCustgroups
| KCustGroupMembers
| KCustGroupAgents;

export type TProjRank = 'A' | 'B' | 'C' | 'D' | '';