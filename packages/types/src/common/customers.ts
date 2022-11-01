import { KeyOfSubtable } from '../utils';
import { ICustgroups, KCustgroups } from './../dbKintone';

export type KCustGroupMembers = KeyOfSubtable<ICustgroups['members']>; 
export type KCustGroupAgents = KeyOfSubtable<ICustgroups['agents']>; 
export type KCustGroupProjects = KeyOfSubtable<ICustgroups['projects']>; 

export type KFlatCustGroup = 
| KCustgroups
| KCustGroupMembers
| KCustGroupAgents
| KCustGroupProjects;

export type TProjRank = 'A' | 'B' | 'C' | 'D' | '';

export const getCustGroupKey = (k: KFlatCustGroup) => k;