import { saveRecord } from '../common';
import { appId, RecordType } from './config';

export const saveEstimate = (params:{
  recordId: string,
  record: Partial<RecordType>
  revision?: string,
}) => {
  return saveRecord({
    app: appId,
    ...params,
  });
};