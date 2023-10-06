import { IProjects } from 'types';
import { TForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';


export const convertToKintone = (
  rawValues: TForm,
): Partial<IProjects>  => {
  const {

    yumeAG,
    cocoAG,
    cocoConst,

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
      value: [
        ...yumeAG,
        ...cocoAG,
        ...cocoConst,
      ].map(({
        empId,
        empName,
        empType,
        empRole,
      }) => ({
        id: '',
        value: {
          agentId: { value: empId },
          agentName: { value: empName },
          agentType: { value: empType || '' },
          empRole: { value: empRole },
        },
      })),
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
