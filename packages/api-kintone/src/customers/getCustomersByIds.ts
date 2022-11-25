import { ICustomers, KCustomers } from 'types';
import { ktRecord } from './../client';
import { appId } from './config';

export const getCustomersByIds = async (ids : string[]) => {

  const updateKey: KCustomers = 'uuid';
  const query = ids.map((id) => `${updateKey} = "${id}" `).join(' or ') + ' order by index asc';

  return (await ktRecord()).getRecords({
    app: appId,
    query,
  }).then(rec => rec.records as unknown as ICustomers[]);
};