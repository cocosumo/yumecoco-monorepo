import { RecordID } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneRecord } from '../config';

/**
 * 関連レコードを更新する
 * 
 * @param projId 
 */
export const updateRelatedProjects = async (projId: string | string[]) => {
  /** 
   * Add other related apps here and its updateFunction if there are other related apps.
   */
  const relatedAppIds = [
    [APPIDS.projectEstimate],
  ];

  /** Handle both string or array */
  const condition = (Array.isArray(projId) ? projId : [projId])
    .map((pId) => `projId = "${pId}"`)
    .join(' or ');

  const jobs = relatedAppIds
    .map(async ([relatedAppId]) => {

      const relatedRecords = await KintoneRecord.getAllRecords({
        app: relatedAppId,
        condition: condition,
      });


      return KintoneRecord.updateRecords({
        app: relatedAppId,
        records: relatedRecords.map(({ $id, projId: _projId }) => {
          return {
            id: $id.value as RecordID,
            record: {
              projId: { value: _projId.value },
            },
          };
        }),
      });
    });
  
  return Promise.all(jobs);
};
