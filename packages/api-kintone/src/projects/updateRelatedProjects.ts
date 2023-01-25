

import { updateRelated } from '../common/updateRelated';
import { AppIds } from 'config';

/**
 * 関連レコードを更新する
 *
 * custGroup 1-n projects 1-n projEstimates
 *
 * @param projId
 */
export const updateRelatedProjects = async (
  projId: string,
) => {

  if (!projId) throw new Error('エラーが発生しました。projIdは定義されていません。');

  /* projects 1-n projEstimates */
  const updatedEstimates = await updateRelated({
    relatedAppId: AppIds.projEstimates,
    recIds: projId,
    lookUpFieldName: 'projId',
  });


  return {
    [AppIds.projEstimates]: updatedEstimates,
  };
};
