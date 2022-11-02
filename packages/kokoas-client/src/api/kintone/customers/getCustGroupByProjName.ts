import { KProjects } from 'types';

import { APPIDS, KintoneRecord } from '../config';

export const getCustGroupByProjName = (projName: string) => {
  /** NOTE: Need stronger typing. 
   * DTSGen does not included related records field.
   */
  const relatedKeyProj = 'relatedProjects';
  const projNameKey: KProjects = 'projName';
  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: `${relatedKeyProj}.${projNameKey} like "${projName}"`,
  });
};