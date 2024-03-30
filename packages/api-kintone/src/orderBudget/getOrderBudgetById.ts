import { RecordKey } from './../projects/config';


import { appId, RecordType } from './config';
import { getRecords } from '../common';

const idField: RecordKey = 'uuid';

export const getOrderBudgetById = async (
  recordId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${recordId}"`,
}).then(({ records }) => records[0] );