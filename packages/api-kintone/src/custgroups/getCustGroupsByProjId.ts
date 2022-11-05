import { KCustGroupProjects } from 'types';
import { ktRecord } from '../client';

import { appId, RecordType } from './config';



export const getCustGroupsByProjId = async (projectId: string) => {
  const projIdField : KCustGroupProjects = 'projId';
  return  (await ktRecord()).getRecords({
    app: appId,
    query: `${projIdField} in ("${projectId}")`,
  }).then(resp => resp.records as unknown as RecordType[]);
};
