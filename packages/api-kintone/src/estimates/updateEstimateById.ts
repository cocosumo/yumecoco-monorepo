import { ktRecord } from './../client';
import { appId, RecordType } from './config';



export const updateEstimateById = async (
  id: string,
  record: Partial<RecordType>,
) => {

  return (await ktRecord()).updateRecord({
    app: appId,
    id,
    record,
  });
};