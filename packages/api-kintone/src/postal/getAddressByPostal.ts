import { getRecords } from '../common';
import { appId, RecordType, RecordKey } from './config';

export const getAddressByPostal = async (postal : string) => {

  const postalField: RecordKey = 'postalCode';
  const query = `${postalField} = "${postal}"`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records?.[0] || null);
};