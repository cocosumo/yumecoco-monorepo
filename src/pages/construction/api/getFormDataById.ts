
import { getConstRecord } from '../../../api/kintone/construction';
import { BuildingTypeVals, ConstructionDetailsType } from '../form';
import { AgentType } from './../../../types/forms';

export const getFormDataById = async (recordId: string): Promise<ConstructionDetailsType> => {
  const {
    $id, constructionTypeId, constructionName,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
  } = await getConstRecord(recordId);

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as AgentType) === 'cocoConst';
  }).map(item => item.value.employeeId.value);

  return {
    custGroupId: $id.value,
    constructionTypeId: constructionTypeId.value,
    constructionName: constructionName.value,
    isAgentConfirmed: Boolean(isAgentConfirmed.value),
    postal: postal.value,
    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingTypeVals,
    isChkAddressKari: Boolean(isChkAddressKari.value),
    cocoConst1: cocoConst?.[0],
    cocoConst2: cocoConst?.[1],
    addressKari: addressKari.value,
  };
};