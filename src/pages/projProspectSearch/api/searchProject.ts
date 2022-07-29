import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

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
    'custName', 'custNameReading',
  ];


  const exactFields : KeyOfFlatProjDetails[] = ['$id', 'custGroupId'];

  const condition = fieldsToCompare
    .map(f => `(${f} ${exactFields.includes(f) ? '=' : 'like'} "${mainSearch}")`)
    .join(' or ');
  return `(${condition})`;
};

/**
 * Simplify kintone records to make it easier to manipulate.
 *
 * @param records
 * @returns simplified Record
 */
const simplifyKintoneRecords = (records: TypeOfProjectDetails[]) => {
  if (!records.length) return [];

  console.log(records);

  return records.map((r) => {
    const {
      $id, memo, constructionName, custGroupId,
      custGroup, agents, custGroupAgents,
      store, 更新日時, 作成日時, 更新者,
    } = r;



    return {
      工事番号: $id.value,
      メモ: memo.value,
      工事名: constructionName.value,
      ゆめてつAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'yumeAG' as AgentType)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすもAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'cocoAG' as AgentType)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすも工事: agents.value
        ?.filter(({ value: { agentId, agentType } }) => !!agentId?.value && agentType?.value === 'cocoConst' as AgentType)
        ?.map(({ value: { agentName } }) => agentName.value)
        .join('、 ') ?? '',

      顧客番号: custGroupId.value,
      顧客名: `${custGroup?.value?.[0]?.value?.custName?.value ?? ''}`,
      全顧客: custGroup?.value?.map(({ value: { custName } }) => custName.value).join(', '),
      店舗名: store.value,
      更新日時: 更新日時?.value,
      作成日時: 作成日時?.value,
      更新者: 更新者?.value?.name,

    };
  });

};

export const searchProject = async (form : Partial<TypeOfForm>) => {
  const { mainSearch } = form;
  const fields : KeyOfProjectDetails[] = [
    'constructionName', '$id', 'custGroupId', 'memo',
    'agents', 'custGroupAgents',
    'custGroup',
    'store', '更新日時', '作成日時', '更新者',
  ];

  const allConditions = [
    mainSearchCondition(mainSearch),
    `(${((k: KeyOfProjectDetails)=>k)('constructionName')} != "")`,
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