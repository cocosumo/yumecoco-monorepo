import { KintoneRecord, APPIDS } from '../../../api/kintone';



export const getCustGroupByProjectId = async (projectId: string) => {
  const projIdField : keyof CustomerGroupTypes.SavedData['projects']['value'][0]['value'] = 'projId';
  return  KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: `${projIdField} in ("${projectId}")`,
  }).then(resp => resp.records as unknown as CustomerGroupTypes.SavedData[]);
};
