import { KFlatProjects } from './../../../../../types/src/common/projects';
import { AppIds } from 'config';
import { KProjects, IProjects, TProjRank } from 'types';
import { KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';
import { simplifyKintoneRecords } from './simplifyKintoneRecords';

// Unpack a promise
type Unpack<T> = T extends Promise<infer U> ? U : T;
export type TSearchResult =  Unpack<ReturnType<typeof searchProject>>;
export type TKeyOfSearchResult = keyof TSearchResult[number];


const getKeyOfProj = (k: KFlatProjects ) => k;

const mainSearchCondition = (mainSearch?: string) => {
  if (!mainSearch) return undefined;

  const fieldsToCompare : KFlatProjects[]  = [
    '$id', 'projName', 'custGroupId', 'memo', 'agentName',
    'custName', 'custNameReading', 'rank',
  ];

  const exactFields : KFlatProjects[] = ['$id', 'custGroupId'];

  const condition = fieldsToCompare
    .map(f => `(${f} ${exactFields.includes(f) ? '=' : 'like'} "${mainSearch}")`)
    .join(' or ');
  return `(${condition})`;
};

const rankCondition = (rank?: TProjRank[]) => {
  if (!rank?.length) return;

  const fieldName: KFlatProjects = 'rank';
  const condition = rank.map(r => {
    return `${fieldName} = "${r}"`;
  }).join(' or ');

  return `(${condition})`;
};



export const searchProject = async (form : Partial<TypeOfForm>) => {
  const {
    mainSearch, rank, custGroupId, projId, projName,

    schedContractPriceMin, schedContractPriceMax,
    schedContractDateMin, schedContractDateMax,
    planApplicationDateMin, planApplicationDateMax,
    estatePurchaseDateMin, estatePurchaseDateMax,

    memo,
  } = form;
  const fields : KProjects[] = [
    'projName', '$id', 'custGroupId', 'memo',
    'agents', 'custGroupAgents',
    'custGroup', 'rank',
    'store', '更新日時', '作成日時',
    'schedContractDate', 'estatePurchaseDate', 'planApplicationDate',
    'schedContractPrice',
  ];


  const allConditions = [
    mainSearchCondition(mainSearch),
    rankCondition(rank),
    custGroupId ? `(${getKeyOfProj('custGroupId')} = "${custGroupId}")` : undefined,
    projId ? `(${getKeyOfProj('$id')} = "${projId}")` : undefined,
    projName ? `(${getKeyOfProj('projName')} like "${projName}")` : undefined,
    schedContractPriceMin?.toString() ? `(${getKeyOfProj('schedContractPrice')} >= ${schedContractPriceMin} and ${getKeyOfProj('schedContractPrice')} != "")` : undefined,
    schedContractPriceMax?.toString() ? `(${getKeyOfProj('schedContractPrice')} <= ${schedContractPriceMax})` : undefined,

    schedContractDateMin ? `(${getKeyOfProj('schedContractDate')} >= "${schedContractDateMin}")` : undefined,
    schedContractDateMax ? `(${getKeyOfProj('schedContractDate')} <= "${schedContractDateMax}")` : undefined,

    planApplicationDateMin ? `(${getKeyOfProj('planApplicationDate')} >= "${planApplicationDateMin}")` : undefined,
    planApplicationDateMax ? `(${getKeyOfProj('planApplicationDate')} <= "${planApplicationDateMax}")` : undefined,

    estatePurchaseDateMin ? `(${getKeyOfProj('estatePurchaseDate')} >= "${estatePurchaseDateMin}")` : undefined,
    estatePurchaseDateMax ? `(${getKeyOfProj('estatePurchaseDate')} <= "${estatePurchaseDateMax}")` : undefined,

    memo ? `(${getKeyOfProj('memo')} like "${memo}")` : undefined,

  ]
    .filter(Boolean)
    .join(' and ');

  const result = await KintoneRecord.getAllRecords({
    app: AppIds.projects,
    condition: allConditions,
    fields: fields,
  });

  return simplifyKintoneRecords(result as unknown as IProjects[]);
};

export const initialSearch = async () => {

  const orderBy: KProjects = '更新日時';

  const result = await KintoneRecord.getRecords({
    app: AppIds.projects,
    query: `order by ${orderBy} desc limit ${10}`,
  });


  return simplifyKintoneRecords(result.records as unknown as IProjects[]);
};