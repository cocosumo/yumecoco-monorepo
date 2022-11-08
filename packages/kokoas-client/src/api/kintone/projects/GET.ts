import { AppIds } from 'config';
import { IProjects } from 'types';
import { KintoneRecord } from '../config';



export const getConstRecord = async (id: string) => {
  return KintoneRecord.getRecord({
    app: AppIds.projects,
    id,
  }).then(resp => resp.record as unknown as IProjects);
};

export const getConstRecordByIds = async (ids: string[]) => {
  return KintoneRecord.getRecords({
    app: AppIds.projects,
    query: ids
      .map(id => `${'$id' as keyof IProjects} = "${id}"`)
      .join(' or '),
  });
};

