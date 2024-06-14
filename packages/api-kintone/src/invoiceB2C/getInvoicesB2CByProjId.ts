import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

const idField: RecordKey = 'projId';

export const getInvoicesB2CByProjId = async (
  projId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${projId}"`,
}).then(({ records }) => records ?? []);