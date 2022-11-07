import { ktRecord } from './../client';
import { calculateEstimateRecord } from './calculateEstimateRecord';

import { RecordType, appId } from './config';

export const getEstimatesById = async (projEstimateId: string) => {
  const result = await (await ktRecord()).getRecord({
    app: appId,
    id: projEstimateId,
  }).then(({ record }) => {

    const newRecord = record as unknown as RecordType;
    const calculated = calculateEstimateRecord(newRecord);

    return {
      record: newRecord,
      calculated,
    };
  });

  return result;
};