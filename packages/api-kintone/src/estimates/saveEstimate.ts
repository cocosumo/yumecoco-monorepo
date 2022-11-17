import { saveRecord } from '../common';
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
  return saveRecord({
    app: appId,
    ...params,
  });

  /* TODO: add function to update related record */
};