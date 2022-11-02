import { IProjestimates } from 'types';
import { calculateEstimateRecord } from '../../others/calculateEstimateRecord';
import { APPIDS, KintoneRecord } from '../config';

export const getEstimatesById = async (projEstimateId: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
  }).then(({ record }) => {

    const newRecord = record as unknown as IProjestimates;
    const calculated = calculateEstimateRecord(newRecord);

    return {
      record: newRecord,
      calculated,
    };
  });

  return result;
};