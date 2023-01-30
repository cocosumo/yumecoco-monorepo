import { appId, RecordKey, RecordType } from './config';
import { getRecords } from '../common';
import { GetRecordsParams, TEnvelopeStatus } from 'types';


export const getContracts = (
  params?: GetRecordsParams<RecordKey>,
) => {
  const {
    limit = 20,
    orderBy = 'completeDate',
    orderMethod = 'asc',
  } = params || {};


  const envStatus : RecordKey = 'envStatus';
  const completedEnvStatus : TEnvelopeStatus = 'completed';

  const baseQuery = `${envStatus} = "${completedEnvStatus}"`;

  const query = `${baseQuery} order by ${orderBy} ${orderMethod} limit ${limit} `;

  return getRecords<RecordType>({
    query,
    totalCount: true,
    app: appId,
  });
};