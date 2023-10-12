import { IEmployees } from '../dbKintone';
import { KeyOfSubtable } from '../utils';

export const agentTypes = ['yumeAG', 'cocoAG', 'cocoConst'] as const;
export type TAgents = typeof agentTypes[number];

export const employeeStatus = ['有効', '無効', '保留(退職済)'] as const;
export type EmpStatus = typeof employeeStatus[number];

export const affiliations =  ['ここすも', 'すてくら', 'ゆめてつ'] as const;
export type EmpAffiliations = typeof affiliations[number];

export const empRoles = ['取締役', '店長', '店長代理', '主任', '営業', '工務'] as const;
export type EmpRoles = typeof empRoles[number];

export const getAgentType = (agentType: TAgents) =>agentType;

export const AGLabels : Record<TAgents, string> = {
  cocoAG : '営業担当者',
  yumeAG : 'ゆめてつAG',
  cocoConst : '工事担当者',
  //sutekura: 'すてくら',
};

/** 選択肢などに出てくる職種 */
export const officerRoles = [
  '取締役',
  '店長',
  '店長代理',
  '主任',
  '営業',
  '工務',
  '経理',
];

export type KEmployeeStores = KeyOfSubtable<IEmployees['affStores']>;