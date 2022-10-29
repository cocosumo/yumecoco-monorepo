import { KintoneRecord, APPIDS } from './../config';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';




/**
 * 顧客グループのレコードを保存する。
 * 
 * @param record 
 * @param custGroupId Optional. If provided, it will update the record instead. 
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

  if (custGroupId) {
    const result = await KintoneRecord.updateRecord({
      app: APPIDS.custGroup,
      id: custGroupId,
      record,
      revision,
    });

    await updateRelatedToCustGroup(custGroupId);

    return {
      ...result,
      id: custGroupId,
    };

  } else {
    return KintoneRecord.addRecord({
      app: APPIDS.custGroup,
      record: record,
    });
  }
};