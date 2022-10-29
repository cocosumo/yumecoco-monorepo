import { RecordID } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneRecord } from '../config';

/**
 * 関連レコードを更新する
 * 
 * @param custGroupId 
 */
export const updateRelatedToCustGroup = async (custGroupId: string | string[]) => {
  /** 
   * Add other related apps here and its updateFunction if there are other related apps.
   */
  const relatedAppIds = [
    [APPIDS.project],
  ];

  /** Handle both string or array */
  const condition = (Array.isArray(custGroupId) ? custGroupId : [custGroupId])
    .map((cgId) => `custGroupId = "${cgId}"`)
    .join(' or ');

  const jobs = relatedAppIds
    .map(async ([relatedAppId]) => {


      const relatedRecords = await KintoneRecord.getAllRecords({
        app: relatedAppId,
        condition: condition,
      });

      return KintoneRecord.updateRecords({
        app: relatedAppId,
        records: relatedRecords.map(({ $id }) => {
          return {
            id: $id.value as RecordID,
            record: {
              custGroupId: { value: $id.value },
            },
          };
        }),
      });
    });
  
  return Promise.all(jobs);
};
