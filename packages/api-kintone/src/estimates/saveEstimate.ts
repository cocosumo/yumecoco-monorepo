import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';

/**
 * 見積もりか契約情報を保存する。
 *
 * 関連情報：
 * project 1-n estimate 1-1 contract
 */
export const saveEstimate = (params:{
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

  /* TODO: add function to update related record */
};