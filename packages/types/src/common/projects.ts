import { KProjects, IProjects } from './../dbKintone';
import { KeyOfSubtable } from './../utils/KeyOfSubtable';

export type IProjectsAgents = KeyOfSubtable<IProjects['agents']>;
export type KFlatProjects = (KProjects | IProjectsAgents );

/* 工事種別 */
export type BuildingType =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';


export const recordStatuses = [
  '情報登録のみ',
  '追客中',
  '契約済',
  '削除',
] as const;

export type RecordStatus = typeof recordStatuses[number];
