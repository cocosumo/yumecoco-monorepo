import { RecordID } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneRecord } from '../config';


export const updateLookup = async ({
  relatedAppIds,
  recIds,
  lookUpFieldName,
}: {
  relatedAppIds: APPIDS[]
  recIds: string | string[]
  /** TODO: Fix type to be more specifict */
  lookUpFieldName: Extract<KeyOfCustomerGroup | KeyOfProjectDetails | keyof Estimates.main.SavedData, 'projId' | 'custGroupId'>
}) => {
  const condition = (Array.isArray(recIds) ? recIds : [recIds])
    .map((id) => `${lookUpFieldName} = "${id}"`)
    .join(' or ');

  const jobs = relatedAppIds
    .map(async (relatedAppId) => {

      const relatedRecords = await KintoneRecord.getAllRecords({
        app: relatedAppId,
        condition: condition,
      });

      return KintoneRecord.updateRecords({
        app: relatedAppId,
        records: relatedRecords.map((rec) => {
          const { $id } = rec;
          return {
            id: $id.value as RecordID,
            record: {
              [lookUpFieldName]: { value: rec[lookUpFieldName].value },
            },
          };
        }),
      });
    });
  
  return Promise.all(jobs);
};