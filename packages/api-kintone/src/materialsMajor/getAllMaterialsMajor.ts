import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getAllMaterialsMajor = async () => {
  return (await ktRecord()).getAllRecords({
    app: appId,
    withCursor: false,
  }).then((recs) => recs as unknown as RecordType[] );
};

export type AwaitedGetAllMaterialsMajor = Awaited<ReturnType<typeof getAllMaterialsMajor>>;