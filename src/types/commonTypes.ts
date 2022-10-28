export type EmployeeType = 'yumeAG' | 'cocoAG' | 'cocoConst' | 'sutekura';

export const agentTypes: Record<EmployeeType, EmployeeType> = {
  cocoAG: 'cocoAG',
  yumeAG: 'yumeAG',
  cocoConst: 'cocoConst',
  sutekura: 'sutekura',
};

export type EmpAffiliations = 'ここすも' | 'すてくら' | 'ゆめてつ';
export type EmpRoles = '店長' | '主任' | '営業' | '工務';

export const AGLabels : Record<EmployeeType, string> = {
  cocoAG : '営業担当者',
  yumeAG : 'ゆめてつAG',
  cocoConst : '工事担当者',
  sutekura: 'すてくら',
};

export interface CustGroupExtented extends CustomerGroupTypes.SavedData {
  'relatedProjects': KeyOfProjDetails
}

export type KeyOfCustGroupExtented = keyof CustGroupExtented;