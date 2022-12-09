import { KCustmemos } from 'types';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getMemosByCustGroupId = async (custGroupId: string) => {
  const custGroupIdField : KCustmemos = 'custGroupId';
  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: `${custGroupIdField} = "${custGroupId}"`,
    withCursor: false,
  }).then(rec => rec as unknown as RecordType[]);

};