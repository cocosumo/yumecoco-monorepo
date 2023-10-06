import { ICustgroups, TAgents, Territory } from 'types';
import { TForm } from '../schema';

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

  return {
    custGroupId: uuid.value,
    storeId: storeId.value,
    storeCode: storeCode.value,
    storeName: storeName.value,
    territory: territory.value as Territory,
    custName: members.value[0]?.value.customerName.value || '',
    
  };

};