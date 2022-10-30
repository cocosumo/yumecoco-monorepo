import { updateLookup } from '../common/updateLookup';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * custGroupId 1-n projects 1-n projEstimates 
 * 
 * @param custGroupId 
 */
export const updateRelatedToCustGroup = async (custGroupId?: string | string[]) => {
  if (!custGroupId) return;

  /* custGroup 1-n projects */
  const updatedProjects = await updateLookup({
    relatedAppId: APPIDS.project,
    recIds: custGroupId,
    lookUpFieldName: 'custGroupId',
  });


  /* projects 1-n projEstimates */
  const projIds = updatedProjects.records.map(({ id }) => id );
  const updatedProjEstimates = await updateLookup({
    relatedAppId: APPIDS.projectEstimate,
    recIds: projIds,
    lookUpFieldName: 'projId',
  });

  return {
    [APPIDS.project]: updatedProjects,
    [APPIDS.projectEstimate] : updatedProjEstimates,
  };

};
