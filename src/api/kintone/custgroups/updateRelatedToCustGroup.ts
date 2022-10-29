import { updateLookup } from '../common/updateLookup';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * @param custGroupId 
 */
export const updateRelatedToCustGroup = async (custGroupId: string | string[]) => {

  /** 
   * UPDATE projects  
   * SET custGroupId = projest.custGroupId
   * WHERE recIds = custGroupId
   * */
  return updateLookup({
    relatedAppIds: [ 
      APPIDS.project,
    ],
    recIds: custGroupId,
    lookUpFieldName: 'custGroupId',
  });

};
