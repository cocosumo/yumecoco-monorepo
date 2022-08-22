import { EstimateAppId, estimateFields, KintoneEstimateRecord } from './config';


export const fetchRecords = async (appName: string) => {
  return KintoneEstimateRecord.getRecords({
    app: EstimateAppId[appName],
    /* query: estimateFields[appName].query, */
    fields: estimateFields[appName].fields,
  }).then(r => r.records as unknown as TypeOfProjectDetails);
};

/* export const getFormDataById = async (appName: string): Promise<TypeOfForm> => {

  const {
    rank,
    estatePurchaseDate,
    memo,
    schedContractDate,
    schedContractPrice,
    planApplicationDate,
    constructionName,
    custGroupId,
    envelopeStatus,
  } = await fetchRecords(appName);

  return {
    projId: recordId,
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    custGroupId: custGroupId.value,
    projName: constructionName.value,
    rank: rank.value,
    schedContractPrice: schedContractPrice.value,
    estatePurchaseDate: estatePurchaseDate.value,
    schedContractDate: schedContractDate.value,
    planApplicationDate: planApplicationDate.value,
    memo: memo.value,
  };

}; */