import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

const idField : RecordKey = 'uuid';

export const getProjById = async (
  projId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${projId}"`,
}).then(({ records }) => records[0] );
  
