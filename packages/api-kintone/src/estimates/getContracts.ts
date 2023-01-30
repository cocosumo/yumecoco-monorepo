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

  const queryNow = [
    baseQuery,
  ]
    .map(q => `(${q})`)
    .join(' and ');


  return getRecords<RecordType>({
    query: `${queryNow} limit ${limit} order by ${orderBy} ${orderMethod}`,
    totalCount: true,
    app: appId,
  });
};