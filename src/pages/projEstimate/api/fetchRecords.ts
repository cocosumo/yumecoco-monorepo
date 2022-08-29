import { EstimateAppId, estimateFields, KEstimateAppId, KintoneEstimateRecord } from './config';


export const fetchRecords = async <T extends KEstimateAppId>(
  appName: T,
  query?: string,
) => {
  return KintoneEstimateRecord.getRecords({
    app: EstimateAppId[appName],
    /* query: estimateFields[appName].query, */
    fields: estimateFields[appName].fields,
    query,
  }).then(r => r.records);
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