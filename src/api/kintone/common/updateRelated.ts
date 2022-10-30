import { getLookUpFields } from './getLookUpFields';
import { Record, RecordID } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneRecord } from '../config';

/**
 * 対処アプリのルークアップフィールドを再取得。
 * recordをしていれば、コピーされます。
 * Refetch related field's lookup values
 * as well as additional fields if defined
 * 
 * @param param
 * @param param.relatedAppId アプリ番号 The app id to be updated.
 * @param param.recIds コピー元のルークアップ値 The value of foreign key. Usually the record number.
 * @param param.lookUpFieldName 対処アプリのルークアップキー Foreign key's field name.
 * @param param.record 任意. 対象アプリにコピーされるフィールド。例：サブテーブル  Optional. Values that will be copied to the related app, e.g. subtable  
 * @returns 条件、関連レコード、idとrevisionの配列。
 * generated condition, related records, and array of id and revision number.
 */
export const updateRelated = async <T = never>({
  relatedAppId,
  recIds,
  lookUpFieldName,
  record,
}: {
  relatedAppId: APPIDS
  recIds: string | string[]
  lookUpFieldName: keyof T
  record?: Partial<T>
}) => {
  if (typeof lookUpFieldName !== 'string') throw new Error(`Invalid lookUpFieldName ${lookUpFieldName.toString()}`);

  const condition = (Array.isArray(recIds) ? recIds : [recIds])
    .map((id) => `${lookUpFieldName} = "${id}"`)
    .join(' or ');

  const [
    lookupFields, 
    relatedRecords,
  ] = await Promise.all([
    /* Get lookupFields */
    getLookUpFields(relatedAppId),
    /* Get related records */
    KintoneRecord.getAllRecords({
      app: relatedAppId,
      condition: condition,
    }),
  ]);

  const { records } = await KintoneRecord.updateRecords({
    app: relatedAppId,
    records: relatedRecords.map((rec) => {
      const { $id } = rec;
      const newRecord : Record =  {};

      for (const lookup in lookupFields) {
        newRecord[lookup] = rec[lookup];
      }
  
      return {
        id: $id.value as RecordID,
        record: {
          ...newRecord,
          ...record,
        },
      };
    }),
  });

  return {
    condition,
    relatedRecords,
    results: records,
  };
    
};