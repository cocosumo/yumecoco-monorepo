import { BuildingType, IProjects, RecordCancelStatus } from 'types';
import { TForm } from '../schema';
import { formatDataId } from 'libs';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { groupAgentsByType } from 'api-kintone/src/projects/helpers/groupAgentsByType';

export const convertProjToForm = (projRec: IProjects) : Partial<TForm> => {

  const {
    projTypeId,
    projName,
    otherProjType,
    custGroupId,
    dataId,
    uuid,
     
    postal, 
    address1, 
    address2,

    isShowFinalAddress,
    finalPostal, 
    finalAddress1,
    finalAddress2,

    buildingType, isChkAddressKari, agents, 
    cancelStatus,
    projTypeName,
    storeId,
    作成日時: createTime,
    memo,
    log,

    projFinDate,
    payFinDate,
    deliveryDate,

    rank,
    schedContractPrice,
    estatePurchaseDate,
    planApplicationDate,
    schedContractDate,
  } = projRec;

  const {
    cocoAG,
    cocoConst,
    yumeAG,
  } = groupAgentsByType(agents);


  return {
    //addressKari: addressKari.value,
    finalPostal: finalPostal.value,
    finalAddress1: finalAddress1.value,
    finalAddress2: finalAddress2.value,

    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingType,
    cancelStatus: cancelStatus
      .value
      .split(',')
      .filter(Boolean) as RecordCancelStatus[],

    cocoConst1: cocoConst?.[0]?.value.agentId.value || '',
    cocoConst2: cocoConst?.[1]?.value.agentId.value || '',
    cocoAG1: cocoAG?.[0]?.value.agentId.value || '',
    cocoAG2: cocoAG?.[1]?.value.agentId.value || '',
    yumeAG1: yumeAG?.[0]?.value.agentId.value || '',
    yumeAG2: yumeAG?.[1]?.value.agentId.value || '',

    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value,
    //isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    
    isAddressKari: Boolean(+isChkAddressKari.value),
    isShowFinalAddress: Boolean(+isShowFinalAddress.value),

    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    otherProjType: otherProjType.value,
    
    projName: projName.value,
    projDataId: formatDataId(dataId.value),
    postal: postal.value,
    storeId: storeId.value,
    memo: memo.value,

    deliveryDate: deliveryDate.value ? parseISO(deliveryDate.value) : null,
    projFinDate: projFinDate.value ? parseISO(projFinDate.value) : null,
    payFinDate: payFinDate.value ? parseISO(payFinDate.value) : null,

    logs: log?.value?.map(({
      id,
      value: {
        logDateTime,
        logNote,
      },
    }) => {
      return {
        dateTime: logDateTime.value ? parseISO(logDateTime.value) : undefined,
        log: logNote.value,
        id,
      };
    }) ?? [],

    // 見込み
    rank: rank.value,
    schedContractPrice: +schedContractPrice.value,
    schedContractDate: schedContractDate.value ? parseISO(schedContractDate.value) : null,
    estatePurchaseDate: estatePurchaseDate.value ? parseISO(estatePurchaseDate.value) : null,
    planApplicationDate: planApplicationDate.value ? parseISO(planApplicationDate.value) : null,

  };

};