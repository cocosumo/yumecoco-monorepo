import { EstimateAppId, KEstimateAppId, KintoneEstimateRecord } from './config';


export const fetchRecords = async <T extends KEstimateAppId>(
  appName: T,
  query?: string,
) => {
  return KintoneEstimateRecord.getRecords({
    app: EstimateAppId[appName],
    /* query: estimateFields[appName].query, */
    query,
  }).then(r => r.records);
};
