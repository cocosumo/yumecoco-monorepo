import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const softDelCustGroupById = async (id: string) => {
  const record: Partial<RecordType> = {
    isDeleted: {
      value: (+true).toString(),
    },
  };

  return (await ktRecord()).updateRecord({
    app: appId,
    record,
    id,
  });
};