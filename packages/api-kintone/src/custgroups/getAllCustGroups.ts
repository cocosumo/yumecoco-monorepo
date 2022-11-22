import { KCustgroups } from 'types';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getAllCustGroups = async (params?:{
  query?: string,
  orderBy?: [KCustgroups, 'desc' | 'asc']
}) => {
  const {
    query,
    orderBy,
  } = params || {};

  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: query,
    orderBy: orderBy?.join(' '),
    withCursor: false,
  }).then(rec => rec as unknown as RecordType[]);
};