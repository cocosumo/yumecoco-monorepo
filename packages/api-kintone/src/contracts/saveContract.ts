import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';

/**
 * 契約情報を保存する。
 *
 * 関連情報：
 * project 1-n contract
 */
export const saveContract = async ({
  record,
  recordId,
  revision,
}:{

  /** uuid  */
  recordId?: string,

  record: Partial<RecordType>

  revision?: string,
}) => {

  /*******************
   * Populate Aggregate Fields
   ******************/

  /** Copy record, but avoid argument mutation. */
  const aggRecord = { ...record };


  return saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: recordId ?? '',
    },
    record: aggRecord,
    revision,
  });

  /* TODO: add function to update related record */
};