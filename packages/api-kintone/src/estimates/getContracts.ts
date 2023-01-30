import { appId, RecordKey, RecordType } from './config';
import { getRecords } from '../common';
import { TEnvelopeStatus } from 'types';




export const getContracts = (
  params: {
    limit?: number,
    orderMethod?: 'asc' | 'desc',
    orderBy?: RecordKey
  },
) => {
  const {
    limit = 50,
    orderBy = 'completeDate',
    orderMethod,
  } = params;


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