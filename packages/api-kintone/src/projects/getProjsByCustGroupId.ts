import { RecordType, appId, RecordKey } from './config';

import { getAllRecords } from '../common';

const custGroupIdField: RecordKey = 'custGroupId';

export const getProjsByCustGroupId = async (
  custGroupId: string,
) => getAllRecords<RecordType>({
  app: appId,
  condition: `${custGroupIdField} = "${custGroupId}"`,
});
