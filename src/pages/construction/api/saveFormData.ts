import { ConstructionDetailsType } from '../../../pages/construction/form';
import { APPIDS, KintoneRecord } from '../../../api/kintone/config';
import { AgentType } from '../../../types/forms';


export const convertToKintone = (
  rawValues: ConstructionDetailsType,
): Partial<ConstructionDetails.SavedData>  => {
  const {
    cocoConst1, cocoConst2, constructionTypeId, constructionName,
    isAgentConfirmed, postal, address1, address2, addressKari, isChkAddressKari,
    buildingType, custGroupId,
  } = rawValues;


  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    constructionType: { value: constructionTypeId },
    constructionName: { value: constructionName },
    isAgentConfirmed: { value: (+isAgentConfirmed).toString() },
    postal: { value: postal },
    address1: { value: address1 },
    address2: { value: address2 },
    addressKari: { value: addressKari },
    isChkAddressKari: { value: (+isChkAddressKari).toString() },
    buildingType: { value: buildingType },
    agents: {
      type: 'SUBTABLE',
      value: [cocoConst1, cocoConst2].map(item => {
        return {
          id: '',
          value: {
            agentType: { value: 'cocoConst' as AgentType },
            employeeId: { value: item as string },
            employeeName: { value: '' },
          },
        };
      }),
    },
  };

};

/**
 * Upserts records
 *
 * @param rawValues
 * @returns
 */
export const saveFormData = async (rawValues: ConstructionDetailsType) : Promise<{
  id: string,
  revision: string,
}> =>{
  const { custGroupId } = rawValues;
  const record = convertToKintone(rawValues);

  if (custGroupId){
    return KintoneRecord.updateRecord({
      app: APPIDS.constructionDetails,
      id: custGroupId as string,
      record,
    })
      .then((result) => ({
        id: custGroupId.toString(),
        revision: result.revision,
      }));
  } else {
    return KintoneRecord.addRecord({ app: APPIDS.constructionDetails, record })
      .catch(err => {
        console.log(err.errors);
        throw new Error('err');
      });
  }

};