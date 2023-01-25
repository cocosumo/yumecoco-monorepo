import { RecordKey } from './../projects/config';


import { appId, RecordType } from './config';
import { getRecords } from '../common';

const idField: RecordKey = 'uuid';
export const getCustGroupById = async (
  custGroupId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${custGroupId}"`,
}).then(({ records }) => records[0] );