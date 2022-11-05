import { ktRecord } from './../client';
import { appId, RecordKey, RecordType } from './config';

export const searchProjects = async (search: string) => {

  const fieldProjName: RecordKey = 'projName';

  return (await ktRecord()).getRecords({
    app: appId,
    query: `${fieldProjName} like "${search}"`,
    totalCount: true,
  })
    .then(r => r.records as unknown as RecordType[]);
};