import { ktRecord } from '../client';
import { calculateEstimateRecord } from './calculateEstimateRecord';

import { RecordType, appId, RecordKey } from './config';

export const getEstimateById = async (projEstimateId: string) => {
  const idField : RecordKey = 'uuid';
  const result = await (await ktRecord()).getRecords({
    app: appId,
    query: `${idField} =  "${projEstimateId}"`,
  }).then(({ records }) => {
    if (!records.length) throw new Error(`projEstimateId not found. ${projEstimateId}`);

    const newRecord = records[0] as unknown as RecordType;
    const calculated = calculateEstimateRecord(newRecord);

    return {
      record: newRecord,
      calculated,
    };
  });

  return result;
};