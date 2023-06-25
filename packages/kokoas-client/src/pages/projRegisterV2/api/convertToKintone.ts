import {  IProjects, TAgents } from 'types';
import { TForm } from '../schema';

export const convertToKintone = (
  rawValues: TForm,
): Partial<IProjects>  => {
  const {
    cocoConst1, cocoConst2, projTypeId, projName,
    isAgentConfirmed, postal, address1, address2, addressKari, 
    isAddressKari,
    buildingType, custGroupId, status,
    cancelStatus,
    storeCode,
    memo,
  } = rawValues;

  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    projTypeId: { value: projTypeId },
    projName: { value: projName },
    isAgentConfirmed: { value: (+isAgentConfirmed).toString() },
    postal: { value: postal },
    address1: { value: address1 },
    address2: { value: address2 },
    isChkAddressKari: { value: (+isAddressKari).toString() },
    addressKari: { value: addressKari },
    buildingType: { value: buildingType },
    agents: {
      type: 'SUBTABLE',
      value: [cocoConst1, cocoConst2]
        .filter(Boolean)
        .map(item => {
          return {
            id: '',
            value: {
              agentType: { value: 'cocoConst' as TAgents },
              agentId: { value: item as string },
              agentName: { value: '' },
            },
          };
        }),
    },
    storeCode: { value: storeCode },
    status: {  value: status  },
    cancelStatus: { value: cancelStatus?.filter(Boolean).join(',') || '' },
    memo: { value: memo || '' },
  };

};
