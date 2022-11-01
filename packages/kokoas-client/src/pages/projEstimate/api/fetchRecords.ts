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
