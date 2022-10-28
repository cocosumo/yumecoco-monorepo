import { APPIDS, KintoneRecord } from '../config';

export const getCustGroupByProjName = (projName: string) => {
  const relatedKeyProj = 'relatedProjects';
  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: `${relatedKeyProj}.projName like "${projName}"`,
  });
};