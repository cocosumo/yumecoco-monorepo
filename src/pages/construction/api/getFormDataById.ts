
import { getConstRecord } from '../../../api/kintone/construction';
import { BuildingTypeVals, ConstructionDetailsType } from '../form';

export const getFormDataById = async (recordId: string): Promise<ConstructionDetailsType> => {
  const {
    $id, constructionTypeId, constructionName,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents,
  } = await getConstRecord(recordId);

  const cocoConst = agents.value.filter();

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
  };
};