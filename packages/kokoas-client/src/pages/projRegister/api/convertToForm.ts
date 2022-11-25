import { format, parseISO } from 'date-fns';
import { BuildingType, ICustgroups, IProjects, RecordCancelStatus, TAgents, Territory } from 'types';
import { TypeOfForm } from '../form';

export const convertProjToForm = (projRec: IProjects) : Partial<TypeOfForm> => {

  console.log(projRec);

  const {
    projTypeId, projName,
    custGroupId, uuid,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
    cancelStatus,
    projTypeName,
    storeId,
    作成日時: createTime,
  } = projRec;

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as TAgents) === 'cocoConst';
  }).map(item => item.value.agentId.value);

  return {
    addressKari: addressKari.value,
    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingType,
    cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
    cocoConst1: cocoConst?.[0] || '',
    cocoConst2: cocoConst?.[1] || '',
    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value,
    isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    isChkAddressKari: Boolean(+isChkAddressKari.value),
    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    projName: projName.value,
    postal: postal.value,
    storeId: storeId.value,
  };

};

export const convertCustGroupToForm = (custGroupRec: ICustgroups) : Partial<TypeOfForm> => {
  const {
    storeId,
    territory,
    uuid,
    members,
  } = custGroupRec;

  return {
    custGroupId: uuid.value,
    storeId: storeId.value,
    territory: territory.value as Territory,
    custName: members.value[0]?.value.customerName.value || '',
  };

};