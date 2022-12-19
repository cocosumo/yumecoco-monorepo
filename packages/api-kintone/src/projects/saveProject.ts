import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';
import { generateProjDataIdSeqNum } from './generateProjDataIdSeqNum';
import { updateRelatedProjects } from './updateRelatedProjects';




/**
 * レコードを保存する。
 *
 * @param record
 * @param projId Optional. If provided, it will update the record instead.
 * @param revision Optional. If record lock is needed, use the record's revision number to define this.
 *
 * @see レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B4%E6%96%B0-PUT-
 *
 * @returns Object containing id and revision.
 */
export const saveProject = async (
  {
    record,
    projId,
    revision,
  }:
  {
    record: Partial<RecordType>,
    projId?: string,
    revision?:string,
  },
) => {

  /*******************
   * Populate Aggregate Fields
   ******************/

  /** Copy record, but avoid argument mutation. */
  const aggRecord = { ...record };

  /* 工事担当者名をcocoConstNames「文字列」にコピーする。 */
  aggRecord.cocoConstNames = {
    value: record.agents?.value
      .map(({ value: { agentName } }) => agentName.value)
      .join(', ') || '',
  };

  /* Generate new dataId, for new record */
  if (!projId) {
    const storeCode = aggRecord.storeCode?.value;
    if (!storeCode) throw new Error(`無効な店舗番号。${storeCode}`);
    const newDataId = await generateProjDataIdSeqNum(storeCode);

    aggRecord.dataId = { value : newDataId };
  }


  /*******************
   * Actual saving process
   ******************/

  const saveResult = await saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: projId || '',
    },
    record: aggRecord,
    revision,
  });

  /*******************
   * Update related database
   ******************/
  if (projId) {
    await updateRelatedProjects(projId);
  }



  return saveResult;

};