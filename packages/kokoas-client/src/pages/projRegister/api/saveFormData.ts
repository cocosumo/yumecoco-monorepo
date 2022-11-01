import { TypeOfProjForm } from '../../../pages/projRegister/form';
import { APPIDS, KintoneRecord } from '../../../api/kintone/config';
import { saveProjectToCustGroup } from './saveProjectToCustGroup';
import { getCustGroupById } from './getCustGroupById';
import { ICustgroups, TAgents } from 'types';


export const convertToKintone = (
  rawValues: TypeOfProjForm,
  custGroupRecord: ICustgroups,
): Partial<ProjectDetails.SavedData>  => {
  const {
    cocoConst1, cocoConst2, projTypeId, projName,
    isAgentConfirmed, postal, address1, address2, addressKari, isChkAddressKari,
    buildingType, custGroupId, status,
    cancelStatus,
  } = rawValues;

  const {
    members,
    agents: custGroupAgents,
  } = custGroupRecord;


  return {
    ...(custGroupId ? { custGroupId: { value: custGroupId } } : undefined),

    projTypeId: { value: projTypeId },
    projName: { value: projName },
    isAgentConfirmed: { value: (+isAgentConfirmed).toString() },
    postal: { value: postal },
    address1: { value: address1 },
    address2: { value: address2 },
    addressKari: { value: addressKari },
    isChkAddressKari: { value: (+isChkAddressKari).toString() },
    buildingType: { value: buildingType },
    agents: {
      type: 'SUBTABLE',
      value: [cocoConst1, cocoConst2]
        .filter(Boolean)
        .map(item => {
          return {
            id: '',
            value: {
              agentType: { value: 'cocoConst' as TAgents },
              agentId: { value: item as string },
              agentName: { value: '' },
            },
          };
        }),
    },
    custGroupAgents: {
      type: 'SUBTABLE',
      value: custGroupAgents.value.map(cga => {
        const { employeeId, agentType } = cga.value;
        return {
          id: '',
          value: {
            custAgentType: { value: agentType.value as TAgents },
            custAgentId: { value: employeeId.value },
            custAgentName: { value: 'auto' },
          },
        };

      }),
    },

    custGroup: {
      type: 'SUBTABLE',
      value: members.value.map(m => {
        const { customerId } = m.value;
        return {
          id: '',
          value: {
            custId: customerId,
            custName: { value: 'auto' },
            custNameReading: { value: 'auto' },
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
  try {


    const { recordId, custGroupId } = rawValues;
    // Also retrieve and save latest custGroup Record to ProjDetails Record.
    const custGroupRecord = await getCustGroupById(custGroupId);
    const record = convertToKintone(rawValues, custGroupRecord);


    if (recordId) {
    /* Update */
      return await KintoneRecord.updateRecord({
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
      return await KintoneRecord.addRecord({
        app: APPIDS.constructionDetails,
        record,
      });
    }
  } catch (err) {
    throw new Error(err.message);
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