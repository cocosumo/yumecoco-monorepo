import { getRecords } from '../common';
import { appId, idField, RecordType, ServiceName } from './config';




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