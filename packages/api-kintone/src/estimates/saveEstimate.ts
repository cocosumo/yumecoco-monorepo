import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';
import { generateEstimateDataIdSeqNum } from './generateEstimateDataIdSeqNum';

/**
 * 見積もりか契約情報を保存する。
 *
 * 関連情報：
 * project 1-n estimate 1-1 contract
 */
export const saveEstimate = async ({
  record,
  recordId,
  revision,
  relatedData,
}:{

  /** uuid  */
  recordId?: string,

  record: Partial<RecordType>

  relatedData?: {
    projDataId: string
  },

  revision?: string,
}) => {

  /*******************
   * Populate Aggregate Fields
   ******************/

  /** Copy record, but avoid argument mutation. */
  const aggRecord = { ...record };


  /* Generate new dataId, for new record */
  if (!recordId) {
    const projDataId = relatedData?.projDataId;
    if (!projDataId) throw new Error(`無効なdataId。${projDataId}`);
    const newDataId = await generateEstimateDataIdSeqNum(projDataId);
    aggRecord.dataId = { value : newDataId };
  }

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