import { updateLookup } from '../common/updateLookup';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * custGroupId 1-n projects 1-n estimates 
 * 
 * @param custGroupId 
 */
export const updateRelatedToCustGroup = async (custGroupId: string | string[]) => {

  return updateLookup({
    relatedAppId: APPIDS.project,
    recIds: custGroupId,
    lookUpFieldName: 'custGroupId',
  });

};
