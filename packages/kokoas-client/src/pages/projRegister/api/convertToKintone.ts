import {  IProjects, TAgents } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = (
  rawValues: TypeOfForm,
): Partial<IProjects>  => {
  const {
    cocoConst1, cocoConst2, projTypeId, projName,
    isAgentConfirmed, postal, address1, address2, addressKari, isChkAddressKari,
    buildingType, custGroupId, status,
    cancelStatus,
  } = rawValues;

  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    projTypeId: { value: projTypeId },
    projName: { value: projName },
    isAgentConfirmed: { value: (+isAgentConfirmed).toString() },
    postal: { value: postal },
    address1: { value: address1 },
    address2: { value: address2 },
    addressKari: { value: addressKari },
    isChkAddressKari: { value: (+isChkAddressKari).toString() },
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

    status: {  value: status  },
    cancelStatus: { value: cancelStatus.join(',') },
  };

};
