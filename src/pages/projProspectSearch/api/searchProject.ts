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
  const { mainSearch, rank } = form;
  const fields : KeyOfProjectDetails[] = [
    'constructionName', '$id', 'custGroupId', 'memo',
    'agents', 'custGroupAgents',
    'custGroup', 'rank',
    'store', '更新日時', '作成日時',
    'schedContractDate', 'estatePurchaseDate', 'planApplicationDate',
    'schedContractPrice',
  ];

  const allConditions = [
    `(${((k: KeyOfProjectDetails)=>k)('constructionName')} != "")`,
    mainSearchCondition(mainSearch),
    rankCondition(rank),
  ]
    .filter(Boolean)
    .join(' and ');

  console.log(allConditions);

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