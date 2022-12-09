import { KProjestimates } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getInvoiceByProjId = async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const projIdKey: KProjestimates = 'projId';

  return getRecords<RecordType>({
    app: appId,
    query: `${projIdKey} = "${projId}"`,
  });
};