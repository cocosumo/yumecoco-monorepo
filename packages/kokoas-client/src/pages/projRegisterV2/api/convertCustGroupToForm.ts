import { ICustgroups, IEmployees, Territory } from 'types';
import { TForm } from '../schema';
import { groupAgentsByType } from 'api-kintone/src/custgroups/helpers/groupAgentsByType';
import { convertCustGroupAgentsToForm } from './convertCustGroupAgentsToForm';

export const convertCustGroupToForm = (
  custGroupRec: ICustgroups,
  employeeRecs: IEmployees[],
): Partial<TForm> => {
  const {
    storeId,
    territory,
    uuid,
    members,
    storeCode,
    agents,
    storeName,

  } = custGroupRec;


  const {
    yumeAG,
    cocoAG,
    cocoConst,
  } = groupAgentsByType(agents);


  return {
    custGroupId: uuid.value,
    storeId: storeId.value,
    storeCode: storeCode.value,
    storeName: storeName.value,
    territory: territory.value as Territory,
    custName: members.value[0]?.value.customerName.value || '',
    yumeAG: convertCustGroupAgentsToForm({
      agents: yumeAG,
      agType: 'yumeAG',
      employeeRecs,
    }),
    cocoAG: convertCustGroupAgentsToForm({
      agents: cocoAG,
      agType: 'cocoAG',
      employeeRecs,
    }),
    cocoConst: convertCustGroupAgentsToForm({
      agents: cocoConst,
      agType: 'cocoConst',
      employeeRecs,
    }),
    
  };

};