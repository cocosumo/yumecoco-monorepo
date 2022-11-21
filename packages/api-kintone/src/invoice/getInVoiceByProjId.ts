import { KProjestimates } from 'types';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getInvoiceByProjId = async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const projIdKey: KProjestimates = 'projId';

  return (await ktRecord()).getRecords({
    app: appId,
    query: `${projIdKey} = "${projId}"`,
  })
    .then(({ records }) => records as unknown as RecordType[]);
};