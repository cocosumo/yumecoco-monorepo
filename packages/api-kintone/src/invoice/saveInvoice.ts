import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';


/**
 * 請求入力画面から、請求書管理情報を登録する
 */
export const saveInvoice = (params:{
  recordId: string,
  record: Partial<RecordType>
  revision?: string,
}) => {

  const {
    recordId,
    revision,
    record,
  } = params;

  return saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: recordId,
    },
    record,
    revision,
  });
};