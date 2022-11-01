import { KeyOfCustGroupExtented } from '../../../types/commonTypes';
import { APPIDS, KintoneRecord } from '../config';

export const getCustGroupByProjName = (projName: string) => {
  const relatedKeyProj: KeyOfCustGroupExtented = 'relatedProjects';
  const projNameKey: KeyOfProjDetails = 'projName';
  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: `${relatedKeyProj}.${projNameKey} like "${projName}"`,
  });
};