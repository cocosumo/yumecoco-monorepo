import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

// サービス名をここに追加
type ServiceName =
| 'andpad';


const idField : RecordKey = 'serviceName';

export const getAuthByServiceName = <T = unknown>(
  serviceName: ServiceName,
) => getRecords<RecordType>({
    app: appId,
    query: `${idField} = "${serviceName}"`,
  })
    .then(({ records }) => {
      const authVal = records[0].auth.value;
      if (authVal) {
        return JSON.parse(authVal) as T;
      }
    } );