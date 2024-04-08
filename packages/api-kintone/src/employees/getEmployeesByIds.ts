import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getEmployeesByIds = async (ids: string[]) => {
  const idField : RecordKey = 'uuid';
  const query = ids.map((id) => {
    return `${idField} = "${id}"`;
  }).join(' or ');

  const result = await getRecords<RecordType>({
    app: appId,
    query,
  });

  const records = result.records;

  const sortRecords = ids.map((id) => {
    return records.find((record) => record.uuid.value === id) as RecordType;
  });

  return {
    ...result,
    records: sortRecords,
  };
};
