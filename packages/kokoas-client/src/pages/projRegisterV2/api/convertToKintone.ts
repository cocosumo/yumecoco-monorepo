import { IProjects } from 'types';
import { TForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';


export const convertToKintone = (
  rawValues: TForm,
): Partial<IProjects>  => {
  const {
    projDataId,
    yumeAG,
    cocoAG,
    cocoConst,
    isNotCocoConstConfirmed,

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
    realEstateStatus,
    schedContractPrice,
    schedContractDate,
    estatePurchaseDate,
    planApplicationDate,
    paymentMethod,

    // 紹介率
    commissionRate,
    commRateByEmployee,
    commRateByRole,

    // 店舗情報
    storeId,
    territory,
    storeName,

    // 利益率
    profitRate,


  } = rawValues;

  console.log('SAVE', storeCode);

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
          agentName: {
            value: empName,
          },
          agentType: { value: empType || '' },
          empRole: { value: empRole },
        },
      })),
    },
    isAgentConfirmed: { value: Number(!isNotCocoConstConfirmed).toString() }, //　isAgentConfirmedは肯定なので、isNotCocoConstConfirmedを反転させる
    status: {  value: status  },
    cancelStatus: { value: cancelStatus?.filter(Boolean).join(',') || '' },
    memo: { value: memo || '' },

    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    projFinDate: { value: toKintoneDateStr(projFinDate) },
    payFinDate: { value: toKintoneDateStr(payFinDate) },

    // 見込み
    rank: { value: rank || '' },
    realEstateStatus: { value: realEstateStatus || 'あり' },
    schedContractPrice: { value: String(schedContractPrice) },
    schedContractDate: { value: toKintoneDateStr(schedContractDate) },
    estatePurchaseDate: { value: toKintoneDateStr(estatePurchaseDate) },
    planApplicationDate: { value: toKintoneDateStr(planApplicationDate) },
    paymentMethod: { value: paymentMethod || '' },

    // 紹介率
    commissionRate: { value: String(commissionRate) },
    // 役職別紹介率
    commRateByRoleList: {
      type: 'SUBTABLE',
      value: commRateByRole.map(({
        role,
        rate,
      }) => ({
        id: '',
        value: {
          commRateByRole: { value: String(rate) },
          role: { value: role },
          rate: { value: String(rate) },
        },
      })),
    },
    // 個別紹介率
    commRateByEmpList: {
      type: 'SUBTABLE',
      value: commRateByEmployee.map(({
        commEmpId,
        commEmpName,
        commEmpRole,
        commEmpRate,
      }) => ({
        id: '',
        value: {
          commRateByEmp: { value: String(commEmpRate) },
          commEmpId: { value: commEmpId },
          commEmpName: { value: commEmpName },
          commEmpRole: { value: commEmpRole },
          commEmpRate: { value: String(commEmpRate) },
        },
      })),
    },

    // 店舗情報
    storeId: { value: storeId },
    territory: { value: territory },
    store: { value: storeName },
    storeCode: { value: storeCode },
    dataId: { value: `${storeCode}-${projDataId.slice(4)}`  },

    // 利益率
    profitRate: { value: String(profitRate) },


  };

};
