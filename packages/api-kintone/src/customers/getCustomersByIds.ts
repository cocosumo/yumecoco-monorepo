import { ICustomers } from 'types';
import { ktRecord } from './../client';
import { appId } from './config';
export const getCustomerByIds = async (ids : string[]) => {

  const query = ids.map((id) => `$id = "${id}" `).join(' or ') + ' order by index asc';

  return (await ktRecord()).getRecords({
    app: appId,
    query,
  }).then(rec => rec.records as unknown as ICustomers[]);
};