import { AppIds } from 'config';
import { IProjects, KProjects } from 'types';
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

/**
 * Get projects by partial search string.
 *
 * @param search Search string
 * @returns
 */
export const searchProjects = async (
  search: string,
) => {

  const fieldProjName: KProjects = 'projName';
  const fields : KProjects[] = ['projName', '$id' ];

  return KintoneRecord.getRecords({
    app: AppIds.projects,
    query: `${fieldProjName} like "${search}"`,
    fields: fields,
    totalCount: true,
  })
    .then(r => r.records as unknown as IProjects[]);
};