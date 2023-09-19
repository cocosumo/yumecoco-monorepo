import { ktRecord } from './../client';
import { VAppIds } from 'config';
import { KtRecordParam } from 'types';
import { UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { v4 as uuidV4 } from 'uuid';

/**
 * 顧客グループのレコードを保存する。
 *
 * @param obj
 * @param obj.appId App's id.
 * @param obj.record Kintone's record object.
 * @param obj.updateKey See below
 * @param obj.updateKey.field Field name of update key,
 * @param obj.updateKey.value value of updateKey. Will insert new record if not provided
 * @param obj.revision Optional. If record lock is needed, use the record's revision number to define this.
 * @param obj.updateRelatedFn Optional. A function that is called when updating a record.
 *
 * @link レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784
 * @link レコードの登録（POST） https://developer.cybozu.io/hc/ja/articles/202166160
 * @returns Object containing id and revision.
 */
export const saveRecordByUpdateKey = async (
  params: {
    app: VAppIds,
    updateKey: UpdateKey,
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
    updateKey,
    app,
    record,
    revision,
    updateRelatedFn,
  } = params;



  /** The actual saving process */
  if (updateKey.value) {
    /* UPDATE */
    const result = await KintoneRecord.updateRecord({
      app: app,
      updateKey,
      record: record,
      revision,
    });



    await updateRelatedFn?.();

    return {
      ...result,
      id: updateKey.value as string,
    };

  } else {
    /* ADD */
    const newId = uuidV4();

    const result = await KintoneRecord.addRecord({
      app: app,
      record: {
        ...record,
        uuid: { value: newId } },
    });

    return {
      ...result,
      id: newId,
    };
  }
};