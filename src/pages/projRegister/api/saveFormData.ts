import { TypeOfProjForm } from '../../../pages/projRegister/form';
import { APPIDS, KintoneRecord } from '../../../api/kintone/config';
import { saveProjectToCustGroup } from './saveProjectToCustGroup';


export const convertToKintone = (
  rawValues: TypeOfProjForm,
): Partial<ConstructionDetails.SavedData>  => {
  const {
    cocoConst1, cocoConst2, constructionTypeId, constructionName,
    isAgentConfirmed, postal, address1, address2, addressKari, isChkAddressKari,
    buildingType, custGroupId, status,
    cancelStatus,
  } = rawValues;

  console.log(rawValues, 'rawValues');

  console.log(isAgentConfirmed, (+isAgentConfirmed).toString(), 'isAgentConfirmed');

  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    constructionTypeId: { value: constructionTypeId },
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
    status: {  value: status  },
    cancelStatus: { value: cancelStatus.join(',') },
  };

};


/**
 * Upserts records
 *
 * @param rawValues
 * @returns
 */
export const saveConstructionData = async (
  rawValues: TypeOfProjForm,
) : Promise<{
  id: string,
  revision: string,
}> => {
  const { recordId } = rawValues;
  const record = convertToKintone(rawValues);

  if (recordId) {
    /* Update */
    return KintoneRecord.updateRecord({
      app: APPIDS.constructionDetails,
      id: recordId as string,
      record,
    })
      .then((result) => ({
        id: recordId.toString(),
        revision: result.revision,
      }));
  } else {
    /* New Record */
    return KintoneRecord.addRecord({
      app: APPIDS.constructionDetails,
      record: record,
    })
      .catch(err => {
        console.log(err.errors);
        throw new Error('err');
      });
  }
};


export const saveFormData = async (rawValues: TypeOfProjForm) : Promise<{
  id: string,
  revision: string,
}> =>{

  return saveConstructionData(rawValues)
    .then(async resp => {

      await saveProjectToCustGroup(
        resp.id,
        rawValues.custGroupId!,
        [rawValues.cocoConst1, rawValues.cocoConst2],
      );

      return resp;
    }).catch((err) => {
      throw new Error('Error occured, contact administrator' + err);
    });

};