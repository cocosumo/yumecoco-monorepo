
import { getConstRecord } from '../../../api/kintone/construction';
import { BuildingTypeVals, TypeOfProjForm } from '../form';
import { RecordCancelStatus, RecordStatus } from '../../../config/formValues';

export const getFormDataById = async (recordId: string): Promise<TypeOfProjForm> => {
  const constructionRecord = await getConstRecord(recordId);
  const {
    constructionTypeId, constructionName,
    custGroupId, $id,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
    constructionType,
    status,
    cancelStatus,
    envelopeStatus,

  } = constructionRecord;

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as AgentType) === 'cocoConst';
  }).map(item => item.value.employeeId.value);

  return {
    recordId: $id.value,
    custGroupId: custGroupId.value,
    constructionTypeId: constructionTypeId.value,
    constructionType: constructionType.value,
    constructionName: constructionName.value,
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
    status: (status?.value as RecordStatus) || '追客中',
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
  };
};