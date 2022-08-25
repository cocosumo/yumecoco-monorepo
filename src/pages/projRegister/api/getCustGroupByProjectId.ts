import { KintoneRecord, APPIDS } from '../../../api/kintone';



export const getCustGroupByProjectId = async (projectId: string) => {
  return  KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: `${'constructionId' as keyof CustomerGroupTypes.SavedData['projects']['value'][0]['value']} in ("${projectId}")`,
  }).then(resp => resp.records as unknown as CustomerGroupTypes.SavedData[]);
};
