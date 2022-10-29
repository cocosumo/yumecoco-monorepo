import { getLookUpFields } from './getLookUpFields';
import { Record, RecordID } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneRecord } from '../config';


export const updateLookup = async ({
  relatedAppId,
  recIds,
  lookUpFieldName,
}: {
  relatedAppId: APPIDS
  recIds: string | string[]
  /** TODO: Fix type to be more specifict */
  lookUpFieldName: Extract<KeyOfCustomerGroup | KeyOfProjectDetails | keyof Estimates.main.SavedData, 'projId' | 'custGroupId'>
}) => {
  const condition = (Array.isArray(recIds) ? recIds : [recIds])
    .map((id) => `${lookUpFieldName} = "${id}"`)
    .join(' or ');



  const [lookupFields, relatedRecords] = await Promise.all([
    getLookUpFields(relatedAppId),
    KintoneRecord.getAllRecords({
      app: relatedAppId,
      condition: condition,
    }),
  ]);


  return KintoneRecord.updateRecords({
    app: relatedAppId,
    records: relatedRecords.map((rec) => {
      const { $id } = rec;
      const newRecord : Record =  {};
      for (const lookup in lookupFields) {
        newRecord[lookup] = rec[lookup];
      }
  
      return {
        id: $id.value as RecordID,
        record: newRecord,
      };
    }),
  });
    
};