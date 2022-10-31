import { APPIDS, KintoneRecord } from './../config';


/**
 * 顧客グループのレコードを保存する。
 *
 * @param obj
 * @param obj.appId App's id.
 * @param obj.record Kintone's record object.
 * @param obj.recordId Optional. If provided, it will update the specified recordId, if not add a new record.
 * @param obj.revision Optional. If record lock is needed, use the record's revision number to define this.
 * @param obj.updateRelatedFn Optional. A function that is called when updating a record.
 *
 * @see レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784
 * @see レコードの登録（POST） https://developer.cybozu.io/hc/ja/articles/202166160
 * @returns Object containing id and revision.
 */
export const saveRecord = async (
  {
    appId,
    recordId,
    record,
    revision,
    updateRelatedFn,
  }:
  {
    appId: APPIDS
    record: Parameters<typeof KintoneRecord.updateRecord>[0]['record'],
    recordId?: string,
    revision?: string,
    updateRelatedFn?: () => Promise<{
      [appId: number] : {
        condition: string,
        results: Array<{
          id: string;
          revision: string;
        }>;
      }
    } | undefined>
  },
) => {

  /** The actual saving process */
  if (recordId) {
    console.log('update', record);
    /* UPDATE */
    const result = await KintoneRecord.updateRecord({
      app: appId,
      id: recordId,
      record: record,
      revision,
    });

    /** IMPORTANT: This updates related apps to this record.  */
    const relatedUpdates =  updateRelatedFn ?  await updateRelatedFn() : undefined;

    return {
      ...result,
      id: recordId,
      relatedUpdates,
    };

  } else {
    /* ADD */
    return KintoneRecord.addRecord({
      app: appId,
      record: record,
    });
  }
};