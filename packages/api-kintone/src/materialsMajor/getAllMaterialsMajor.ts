import { ktRecord } from '../client';
import { appId, RecordKey, RecordType } from './config';

export const getAllMaterialsMajor = async () => {

  const orderKey : RecordKey = 'code';

  return (await ktRecord()).getAllRecords({
    app: appId,
    orderBy: `${orderKey} asc`,
    withCursor: false,
  }).then((recs) => recs as unknown as RecordType[] );
};

export type AwaitedGetAllMaterialsMajor = Awaited<ReturnType<typeof getAllMaterialsMajor>>;