import { APPIDS, KintoneRecord } from '../../../../api/kintone';

export const searchProjects = async <
  T extends KeyOfProjectDetails,
>(search: string) => {

  return KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `${'constructionName' as T} like "${search}"`,
    fields: ['constructionName', '$id' ] as T[],
    totalCount: true,
  })
    .then(r => r.records as unknown as ProjectDetails.SavedData[]);
};