import { saveRecord } from '../common/saveRecord';
import { APPIDS } from './../config';
import { getAgentNames } from './getAgentNames';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';




/**
 * 顧客グループのレコードを保存する。
 * 
 * @param record 
 * @param custGroupId Optional. If provided, it will update the record instead. 
 * @param revision Optional. If record lock is needed, use the record's revision number to define this.
 * 
 * @see レコードの更新（PUT） https://developer.cybozu.io/hc/ja/articles/201941784-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B4%E6%96%B0-PUT-
 * 
 * @returns Object containing id and revision.
 */
export const saveCustGroup = async (
  {
    record,
    custGroupId,
    revision,
  }:
  {
    record: Partial<CustomerGroupTypes.SavedData>, 
    custGroupId?: string,
    revision?:string,
  },
) => {

  /** Populate aggregate fields. */
  const aggRecord = { ...record }; // avoid argument mutation.
  aggRecord.custNames = { 
    value: record.members?.value
      .map(({ value: { customerName } })=> customerName.value)
      .join(', ') || '', 
  };
  
  aggRecord.cocoAGNames = { 
    value: getAgentNames(record, 'cocoAG'), 
  };
  aggRecord.yumeAGNames = { 
    value: getAgentNames(record, 'yumeAG'), 
  };

  return saveRecord({
    appId: APPIDS.custGroup,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: () => updateRelatedToCustGroup(custGroupId),
  });
};