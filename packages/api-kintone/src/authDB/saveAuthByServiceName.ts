import { IAuthdb } from 'types';
import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, idField, ServiceName } from './config';

export const saveAuthByServiceName = async (
  serviceName: ServiceName,
  auth: string,
) => {

  const record : Partial<IAuthdb> = {
    auth: { value: auth },
  };

  const result = await saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: idField,
      value: serviceName,
    },
    record,
  });

  return result;
};