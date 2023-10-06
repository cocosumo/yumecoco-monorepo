import { ICustgroups, Territory } from 'types';
import { TForm } from '../schema';
import { groupAgentsByType } from 'api-kintone/src/custgroups/helpers/groupAgentsByType';

export const convertCustGroupToForm = (custGroupRec: ICustgroups) : Partial<TForm> => {
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
    cocoAG,
    yumeAG,
  } = groupAgentsByType(agents);

  return {
    custGroupId: uuid.value,
    storeId: storeId.value,
    storeCode: storeCode.value,
    storeName: storeName.value,
    territory: territory.value as Territory,
    custName: members.value[0]?.value.customerName.value || '',

    cocoAG1: cocoAG?.[0]?.value.employeeId.value || '',
    cocoAG2: cocoAG?.[1]?.value.employeeId.value || '',
    yumeAG1: yumeAG?.[0]?.value.employeeId.value || '',
    yumeAG2: yumeAG?.[1]?.value.employeeId.value || '',
    
  };

};