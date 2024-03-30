import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';


/**
 * 「発注一覧」を保存する。
 *
 * 関連情報：
 * project 1-1 orderBudget 1-n orderBudgetItems n-1 order
 */
export const saveOrderBudget = async ({
  record,
  recordId,
  revision,
}:{

  /** uuid  */
  recordId?: string,

  record: Partial<RecordType>

  revision?: string,
}) => {

  console.log('saveOrderBudget', record, recordId);

  return saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: recordId ?? '',
    },
    record: record,
    revision,
  });

  /* TODO: add function to update related record */
};