
import { getConstRecord } from '../../../api/kintone/construction';
import { BuildingTypeVals, ConstructionDetailsType } from '../form';
import { AgentType } from './../../../types/forms';

export const getFormDataById = async (recordId: string): Promise<ConstructionDetailsType> => {
  const constructionRecord = await getConstRecord(recordId);
  const {
    constructionTypeId, constructionName,
    custGroupId, $id,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
    constructionType,
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

  };
};