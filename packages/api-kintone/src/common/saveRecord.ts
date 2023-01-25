import { ktRecord } from './../client';
import { VAppIds } from 'config';
import { KtRecordParam } from 'types';

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
 * @link レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784
 * @link レコードの登録（POST） https://developer.cybozu.io/hc/ja/articles/202166160
 * @returns Object containing id and revision.
 */
export const saveRecord = async (
  params: {
    app: VAppIds,
    recordId?: string,
    record?: KtRecordParam<'updateRecord'>['record'],
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



  const KintoneRecord = await ktRecord();

  const {
    recordId,
    app,
    record,
    revision,
    updateRelatedFn,
  } = params;


  /** The actual saving process */
  if (recordId) {
    /* UPDATE */
    const result = await KintoneRecord.updateRecord({
      app: app,
      id: recordId,
      record: record,
      revision,
    });

    await updateRelatedFn?.();

    return {
      ...result,
      id: recordId,
    };

  } else {
    /* ADD */


    const result = await KintoneRecord.addRecord({
      app: app,
      record: record,
    });
    
    return result;
  }
};