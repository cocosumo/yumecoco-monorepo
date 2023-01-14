import { KFlatProjects } from './../../../../../types/src/common/projects';
import { KProjects, TProjRank } from 'types';
import { TypeOfForm } from '../form';
import { simplifyKintoneRecords } from './simplifyKintoneRecords';
import { getAllProjects, getProjects } from 'api-kintone';

// Unpack a promise
type Unpack<T> = T extends Promise<infer U> ? U : T;
export type TSearchResult =  Unpack<ReturnType<typeof searchProject>>;
export type TKeyOfSearchResult = keyof TSearchResult[number];


const getKeyOfProj = (k: KFlatProjects ) => k;

const mainSearchCondition = (mainSearch?: string) => {
  if (!mainSearch) return undefined;

  const fieldsToCompare : KFlatProjects[]  = [
    '$id', 'projName', 'custGroupId', 'memo',
    'agentName', 'custNames',
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

  const records = await getAllProjects({
    condition: allConditions,
  });


  return simplifyKintoneRecords(records);
};

export const initialSearch = async () => {

  const orderBy: KProjects = '更新日時';
  const { records } = await getProjects({
    query: `order by ${orderBy} desc limit ${10}`,
  });


  return simplifyKintoneRecords(records);
};