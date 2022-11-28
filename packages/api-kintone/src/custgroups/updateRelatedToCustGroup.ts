import { ICustgroups, IProjects, IProjestimates } from 'types';
import { updateRelated } from '../common/updateRelated';
import { AppIds } from 'config';

/**
 * 関連レコードを更新する
 *
 * custGroupId 1-n projects 1-n projEstimates
 *
 * @param custGroupId
 */
export const updateRelatedToCustGroup = async (
  record: Partial<ICustgroups>,
  custGroupId: string | string[],
) => {
  if (!custGroupId) throw new Error('エラーが発生しました。custGroupIdは定義されていません。');

  /* custGroup 1-n projects */
  const updatedProjects = await updateRelated<IProjects>({
    relatedAppId: AppIds.projects,
    recIds: custGroupId,
    lookUpFieldName: 'custGroupId',
  });


  /* projects 1-n projEstimates */
  const projIds = updatedProjects.results.map(({ id }) => id );
  const updatedProjEstimates = await updateRelated<IProjestimates>({
    relatedAppId: AppIds.projEstimates,
    recIds: projIds,
    lookUpFieldName: 'projId',
  });

  return {
    [AppIds.projects]: updatedProjects,
    [AppIds.projEstimates] : updatedProjEstimates,
  };

};
