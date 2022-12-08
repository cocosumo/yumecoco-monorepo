import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getCocosumoDetails = async () => {

  return getRecords<RecordType>({
    app: appId,
    query: 'order by $id desc limit 1',
  }).then(({ records }) => records[0]);
};