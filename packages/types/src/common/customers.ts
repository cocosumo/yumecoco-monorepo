import { KeyOfSubtable } from '../utils';
import { ICustgroups, KCustgroups } from './../dbKintone';

export type KCustGroupMembers = KeyOfSubtable<ICustgroups['members']>;
export type KCustGroupAgents = KeyOfSubtable<ICustgroups['agents']>;

export type KFlatCustGroup =
| KCustgroups
| KCustGroupMembers
| KCustGroupAgents;


export const ranks = ['A', 'B', 'C', 'D', ''] as const;
export type TProjRank = typeof ranks[number];
export type TContact = 'email' | 'tel';


export const relations = [
  '契約者',
  '配偶者',
  '婚約者',
  '家「固定電話」',
  '親',
  '子',
  '祖父母',
  '兄弟姉妹',
  '同居人',
  '会社（固定電話）',
  '法人担当者',
  'その他'] as const;
export type TRelation = typeof relations[number];

export const getCustGroupKey = (k: KFlatCustGroup) => k;