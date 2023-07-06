import { BuildingType, IProjects, RecordCancelStatus, TAgents } from 'types';
import { TForm } from '../schema';
import { formatDataId } from 'libs';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const convertProjToForm = (projRec: IProjects) : Partial<TForm> => {

  const {
    projTypeId,
    projName,
    custGroupId,
    dataId,
    uuid,
     
    postal, address1, address2,

    isShowFinalAddress,
    finalPostal, finalAddress1, finalAddress2,

    buildingType, isChkAddressKari, agents, 
    cancelStatus,
    projTypeName,
    storeId,
    作成日時: createTime,
    memo,
    log,
  } = projRec;

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as TAgents) === 'cocoConst';
  }).map(item => item.value.agentId.value);


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
    cocoConst1: cocoConst?.[0] || '',
    cocoConst2: cocoConst?.[1] || '',
    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value,
    //isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    
    isAddressKari: Boolean(+isChkAddressKari.value),
    isShowFinalAddress: Boolean(+isShowFinalAddress.value),

    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    projName: projName.value,
    projDataId: formatDataId(dataId.value),
    postal: postal.value,
    storeId: storeId.value,
    memo: memo.value,
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
  };

};