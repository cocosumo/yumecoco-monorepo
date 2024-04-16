import { v4 } from 'uuid';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';
import { generateOrderDataId } from './generateOrderDataId';
import { produce } from 'immer';

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

  let parsedOrderDataId = record.orderDataId?.value;

  if (!parsedOrderDataId) {
    const { newOrderDataId } = await generateOrderDataId();
    parsedOrderDataId = newOrderDataId;
  }


  const parsedRecord = produce(record, (draft) => {
    
    draft.orderDataId = { value: parsedOrderDataId };
  });

  const KintoneRecord = await ktRecord();

  const result = await KintoneRecord.upsertRecord({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: parsedRecordId,
    },
    record: parsedRecord,
    revision: revision,
  });

  return {
    ...result,
    recordId: parsedRecordId,
  };
};


// params
export type SaveOrderParams = Parameters<typeof saveOrder>[0];