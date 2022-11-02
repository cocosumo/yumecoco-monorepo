import { ICustgroups, KCustGroupProjects } from 'types';
import { KintoneRecord, APPIDS } from '../../../api/kintone';



export const getCustGroupByProjectId = async (projectId: string) => {
  const projIdField : KCustGroupProjects = 'projId';
  return  KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: `${projIdField} in ("${projectId}")`,
  }).then(resp => resp.records as unknown as ICustgroups[]);
};
