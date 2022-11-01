import { APPIDS, KintoneRecord } from './../config';

/** @deprecated ファイル構成ルール変更によります。./updateEstimateById に変更してください */
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