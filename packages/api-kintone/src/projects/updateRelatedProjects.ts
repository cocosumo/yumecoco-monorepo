

import { updateRelated } from '../common/updateRelated';
import { AppIds } from 'config';
import { RecordType } from './config';
import { saveProjToCustGroup } from './saveProjToCustGroup';

/**
 * 関連レコードを更新する
 * 
 * custGroup 1-n projects 1-n projEstimates
 * 
 * @param projId 
 */
export const updateRelatedProjects = async (
  projId: string,
  projRecord: Partial<RecordType>,
) => {
  if (!projId) throw new Error('エラーが発生しました。projIdは定義されていません。');

  /* projects 1-n projEstimates */
  const updatedEstimates = await updateRelated({
    relatedAppId: AppIds.projEstimates,
    recIds: projId,
    lookUpFieldName: 'projId',
  });

  /* proj -> custGroup 保存 */
  const {
    custGroupId,
  } = projRecord;

  if (!custGroupId) throw new Error(`顧客番号は無効です。${custGroupId}`);

  await saveProjToCustGroup({
    projectId: projId,
    custGroupId: custGroupId?.value,
  });


  return {
    [AppIds.projEstimates]: updatedEstimates,
  };
};
