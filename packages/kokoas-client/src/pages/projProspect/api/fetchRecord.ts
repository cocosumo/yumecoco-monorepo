import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

export const fetchRecord = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  }).then(r => r.record as unknown as TypeOfProjectDetails);
};

export const getFormDataById = async (recordId: string): Promise<TypeOfForm> => {

  const {
    rank,
    estatePurchaseDate,
    memo,
    schedContractDate,
    schedContractPrice,
    planApplicationDate,
    projName,
    custGroupId,
    envelopeStatus,
  } = await fetchRecord(recordId);

  return {
    projId: recordId,
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    custGroupId: custGroupId.value,
    projName: projName.value,
    rank: rank.value,
    schedContractPrice: schedContractPrice.value,
    estatePurchaseDate: estatePurchaseDate.value,
    schedContractDate: schedContractDate.value,
    planApplicationDate: planApplicationDate.value,
    memo: memo.value,
  };

};