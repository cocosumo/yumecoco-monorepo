import { getRecord } from '../common/getRecord';
import { appId, RecordType } from './config';

export const getEmployeeByRecordId = async (id: string) => {

  return getRecord<RecordType>({
    app: appId,
    id,
  });
};
