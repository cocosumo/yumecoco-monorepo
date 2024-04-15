import { ktRecord } from '../client';
import { appId, RecordType } from './config';


/**
 * 「発注明細」を保存する。
 *
 * 関連情報：
 * orderBudgetItems n-1 order
 */
export const saveOrder = async ({
  record,
  recordId,
  revision,
}:{

  /** uuid  */
  recordId: string,

  record: Partial<RecordType>

  revision?: string,
}) => {

  if (!recordId) throw new Error('recordId is required');

  const KintoneRecord = await ktRecord();
  

  return KintoneRecord.upsertRecord({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: recordId,
    },
    record: record,
    revision: revision,
  });
};