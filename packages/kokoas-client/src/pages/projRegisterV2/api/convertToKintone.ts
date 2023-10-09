import {  IProjects, TAgents } from 'types';
import { TForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';

const convertToAgentsTbl = (
  empIds: string[],
  agentType: TAgents,
) => {
  return empIds.filter(Boolean)
    .map(item => {
      return {
        id: '',
        value: {
          agentType: { value: agentType },
          agentId: { value: item as string },
          agentName: { value: '' },
        },
      };
    });
};

export const convertToKintone = (
  rawValues: TForm,
): Partial<IProjects>  => {
  const {
    cocoConst1, 
    cocoConst2, 

    cocoAG1,
    cocoAG2,

    yumeAG1,
    yumeAG2,
    
    projTypeId, 
    projName,
    otherProjType,

    postal, 
    address1, 
    address2,
    finalPostal, 
    finalAddress1, 
    finalAddress2, 
    isAddressKari,
    isShowFinalAddress,
    buildingType, custGroupId, status,
    cancelStatus,
    storeCode,
    memo,

    deliveryDate,
    projFinDate,
    payFinDate,

    rank,
    schedContractPrice,
    schedContractDate,
    estatePurchaseDate,
    planApplicationDate,
    paymentMethod,
  } = rawValues;



  const agentsTable = [
    ...convertToAgentsTbl([cocoConst1, cocoConst2], 'cocoConst'),
    ...convertToAgentsTbl([cocoAG1, cocoAG2], 'cocoAG'),
    ...convertToAgentsTbl([yumeAG1, yumeAG2], 'yumeAG'),
  ];

  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    projTypeId: { value: projTypeId || '' },
    projName: { value: projName },
    otherProjType: { value: otherProjType || '' },
    

    postal: { value: postal },
    address1: { value: address1 },
    address2: { value: address2 },

    finalPostal: { value: finalPostal },
    finalAddress1: { value: finalAddress1 },
    finalAddress2: { value: finalAddress2 },

    isChkAddressKari: { value: (+isAddressKari).toString() },
    isShowFinalAddress: { value: (+isShowFinalAddress).toString() },
    //addressKari: { value: addressKari },
    buildingType: { value: buildingType },
    agents: {
      type: 'SUBTABLE',
      value: agentsTable,
    },
    storeCode: { value: storeCode },
    status: {  value: status  },
    cancelStatus: { value: cancelStatus?.filter(Boolean).join(',') || '' },
    memo: { value: memo || '' },

    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    projFinDate: { value: toKintoneDateStr(projFinDate) },
    payFinDate: { value: toKintoneDateStr(payFinDate) },

    // 見込み
    rank: { value: rank || '' },
    schedContractPrice: { value: String(schedContractPrice) },
    schedContractDate: { value: toKintoneDateStr(schedContractDate) },
    estatePurchaseDate: { value: toKintoneDateStr(estatePurchaseDate) },
    planApplicationDate: { value: toKintoneDateStr(planApplicationDate) },
    paymentMethod: { value: paymentMethod || '' },

  };

};
