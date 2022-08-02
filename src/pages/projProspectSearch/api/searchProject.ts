import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';
import { simplifyKintoneRecords } from './simplifyKintoneRecords';

// Unpack a promise
type Unpack<T> = T extends Promise<infer U> ? U : T;
export type TSearchResult =  Unpack<ReturnType<typeof searchProject>>;
export type TKeyOfSearchResult = keyof TSearchResult[number];

type KeyOfAgents = keyof TypeOfProjectDetails['agents']['value'][number]['value'];
type KeyOfCustGroup = keyof TypeOfProjectDetails['custGroup']['value'][number]['value'];
type KeyOfFlatProjDetails = (KeyOfProjectDetails | KeyOfAgents | KeyOfCustGroup);

const getKeyOfProj = (k: KeyOfFlatProjDetails ) => k;

const mainSearchCondition = (mainSearch?: string) => {
  if (!mainSearch) return undefined;

  let fieldsToCompare : KeyOfFlatProjDetails[]  = [
    '$id', 'constructionName', 'custGroupId', 'memo', 'agentName',
    'custName', 'custNameReading', 'rank',
  ];

  const exactFields : KeyOfFlatProjDetails[] = ['$id', 'custGroupId'];

  const condition = fieldsToCompare
    .map(f => `(${f} ${exactFields.includes(f) ? '=' : 'like'} "${mainSearch}")`)
    .join(' or ');
  return `(${condition})`;
};

const rankCondition = (rank?: TProjRank[]) => {
  if (!rank?.length) return;

  const fieldName: KeyOfFlatProjDetails = 'rank';
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
  const fields : KeyOfProjectDetails[] = [
    'constructionName', '$id', 'custGroupId', 'memo',
    'agents', 'custGroupAgents',
    'custGroup', 'rank',
    'store', '更新日時', '作成日時',
    'schedContractDate', 'estatePurchaseDate', 'planApplicationDate',
    'schedContractPrice',
  ];


  const allConditions = [
    //`(${getKeyOfProj('constructionName')} != "")`,
    mainSearchCondition(mainSearch),
    rankCondition(rank),
    custGroupId ? `(${getKeyOfProj('custGroupId')} = "${custGroupId}")` : undefined,
    projId ? `(${getKeyOfProj('$id')} = "${projId}")` : undefined,
    projName ? `(${getKeyOfProj('constructionName')} like "${projName}")` : undefined,
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

  console.log('AllConditions', allConditions);

  const result = await KintoneRecord.getAllRecords({
    app: APPIDS.constructionDetails,
    condition: allConditions,
    fields: fields,
  });

  return simplifyKintoneRecords(result as unknown as TypeOfProjectDetails[]);
};

export const initialSearch = async () => {

  const orderBy: KeyOfProjectDetails = '更新日時';

  const result = await KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `order by ${orderBy} desc limit ${10}`,
  });


  return simplifyKintoneRecords(result.records as unknown as TypeOfProjectDetails[]);
};