
import { getConstRecord } from '../../../api/kintone/projects';
import { BuildingTypeVals, TypeOfForm } from '../form';
import { RecordCancelStatus, RecordStatus } from '../../../config/formValues';
import { TAgents, TEnvelopeStatus } from 'types';

export const getFormDataById = async (recordId: string): Promise<TypeOfForm> => {
  const projDetailsRecord = await getConstRecord(recordId);
  const {
    projTypeId, projName,
    custGroupId, $id,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
    status,
    cancelStatus,
    envelopeStatus,
    projTypeName,

  } = projDetailsRecord;

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as TAgents) === 'cocoConst';
  }).map(item => item.value.agentId.value);

  return {
    recordId: $id.value,
    custGroupId: custGroupId.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    projName: projName.value,
    isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    postal: postal.value,
    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingTypeVals,
    isChkAddressKari: Boolean(+isChkAddressKari.value),
    cocoConst1: cocoConst?.[0],
    cocoConst2: cocoConst?.[1],
    addressKari: addressKari.value,
    storeId: '',
    territory: '',
    custName: '',
    status: (status?.value as RecordStatus) || '追客中',
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
  };
};