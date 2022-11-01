import { APPIDS, KintoneRecord } from '../config';

export const getProjById = (projId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.project,
    id: projId,
  }).then(({ record }) => record as unknown as ProjectDetails.SavedData);
};