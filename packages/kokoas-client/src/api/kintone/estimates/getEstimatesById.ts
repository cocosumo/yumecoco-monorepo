import { calculateEstimateRecord } from '../../others/calculateEstimateRecord';
import { APPIDS, KintoneRecord } from '../config';

export const getEstimatesById = async (projEstimateId: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
  }).then(({ record }) => {

    const newRecord = record as unknown as Estimates.main.SavedData;
    const calculated = calculateEstimateRecord(newRecord);

    return {
      record: newRecord,
      calculated,
    };
  });

  return result;
};