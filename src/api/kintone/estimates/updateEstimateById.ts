import { APPIDS, KintoneRecord } from './../config';


export const updateEstimateById = (
  id: string,
  record: Partial<Estimates.main.SavedData>,
) => {


  return KintoneRecord.updateRecord({
    app: APPIDS.projectEstimate,
    id,
    record,
  });
};