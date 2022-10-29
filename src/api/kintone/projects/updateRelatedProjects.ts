
import { updateLookup } from '../common/updateLookup';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * projects 1-n projEstimates
 * 
 * @param projId 
 */
export const updateRelatedProjects = async (projId: string | string[]) => {
  return updateLookup({
    relatedAppId: APPIDS.projectEstimate,
    recIds: projId,
    lookUpFieldName: 'projId',
  });
};
