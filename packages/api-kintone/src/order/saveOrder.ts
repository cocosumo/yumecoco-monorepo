import { v4 } from 'uuid';
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
  recordId?: string,

  record: Partial<RecordType>

  revision?: string,
}) => {

  const parsedRecordId = recordId || v4();

  const KintoneRecord = await ktRecord();

  const result = await KintoneRecord.upsertRecord({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: parsedRecordId,
    },
    record: record,
    revision: revision,
  });

  return result;
};