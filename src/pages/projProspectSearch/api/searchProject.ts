import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

type KeyOfAgents = keyof TypeOfProjectDetails['agents']['value'][number]['value'];
type KeyOfCustGroup = keyof TypeOfProjectDetails['custGroup']['value'][number]['value'];
type KeyOfFlatProjDetails = (KeyOfProjectDetails | KeyOfAgents | KeyOfCustGroup);


const fields : KeyOfProjectDetails[] = [
  'constructionName', '$id', 'custGroupId', 'memo', 'agents', 'custGroup',
];


const mainSearchCondition = (mainSearch?: string) => {
  if (!mainSearch) return undefined;

  let fieldsToCompare : KeyOfFlatProjDetails[]  = [
    '$id', 'constructionName', 'custGroupId', 'memo', 'employeeName',
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

  return records.map((r) => {
    const {
      $id, memo, constructionName, custGroupId,
      custGroup, agents,
    } = r;

    return {
      $id: $id.value,
      memo: memo.value,
      projName: constructionName.value,
      agents: agents.value.map(a => {
        const { agentType, employeeName } = a.value;
        return {
          agentType: agentType.value,
          employeeName: employeeName.value,
        };
      }),
      custGroupId: custGroupId.value,
      custGroup: custGroup.value.map(c => {
        const { custName, custNameReading, custId } = c.value;
        return {
          custId: custId.value,
          custName: custName.value,
          custNameReading: custNameReading.value,
        };
      }),
    };
  });

};

export const searchProject = async (form : Partial<TypeOfForm>) => {
  const { mainSearch } = form;


  const condition = [
    mainSearchCondition(mainSearch),
  ].join(' and ');

  console.log(condition);

  const result = await KintoneRecord.getAllRecords({
    app: APPIDS.constructionDetails,
    condition: condition,
    fields: fields,
  });

  return simplifyKintoneRecords(result as unknown as TypeOfProjectDetails[]);
};