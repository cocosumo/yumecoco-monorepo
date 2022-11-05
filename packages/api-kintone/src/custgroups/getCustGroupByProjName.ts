import { KProjects } from 'types';
import { ktRecord } from '../client';

import { appId, RecordType } from './config';

export const getCustGroupByProjName = async (projName: string) => {
  /** NOTE: Need stronger typing. 
   * DTSGen does not included related records field.
   */
  const relatedKeyProj = 'relatedProjects';
  const projNameKey: KProjects = 'projName';

  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: `${relatedKeyProj}.${projNameKey} like "${projName}"`,
  }).then(record => record as unknown as RecordType[]);
};