import { KProjects, KProjestimates, IProjects, IProjestimates } from 'types';
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
  custGroupId: string | string[],
) => {


  if (!custGroupId) throw new Error('エラーが発生しました。custGroupIdは定義されていません。');

  /* custGroup 1-n projects */
  const projectFK : KProjects = 'custGroupId';
  const updatedProjects = await updateRelated<IProjects>({
    relatedAppId: AppIds.projects,
    recIds: custGroupId,
    lookUpFieldName: projectFK,
  });


  /* projects 1-n projEstimates */
  const estimateFK: KProjestimates = 'projId';
  const projIds = updatedProjects?.results.map(({ id }) => id );

  if (projIds) {
    return {
      [AppIds.projects]: updatedProjects,
      [AppIds.projEstimates]: await updateRelated<IProjestimates>({
        relatedAppId: AppIds.projEstimates,
        recIds: projIds,
        lookUpFieldName: estimateFK,
      }),
    };

  }
   

  return {
    [AppIds.projects]: updatedProjects,
  };

};
