import { ICustgroups } from 'types';
import { saveRecord } from '../common/saveRecord';
import { saveCustomers } from '../customers/saveCustomers';
import { APPIDS } from './../config';
import { getAgentNames } from './getAgentNames';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

/**
 * custGroupを保存する処理
 *
 * @param param
 * @param param.record custGroupのレコード
 * @param param.custGroupId Optional. 顧客グループのレコード
 * @param param.customerRecords 顧客のレコードの配列
 * @param param.revision Optional
 * @returns
 */
export const saveCustGroup = async (
  {
    record,
    custGroupId,
    revision,
    customerRecords,
  }:
  {
    record: Partial<ICustgroups>,
    custGroupId?: string,
    revision?:string,
    customerRecords: Partial<CustomerTypes.SavedData>[]
  },
) => {

  /** Create copy of record to populate aggregates. */
  const aggRecord = { ...record }; // avoid argument mutation.


  /** Save customer records to db.customers and retrieve customer ids */
  const customerIds = await saveCustomers({ records: customerRecords });

  /**
   * Populate db.custGroup.members with the customerIds
   *
   * value: "auto" are copy fields. These are not required by kintone,
   * but for the sake of clarity, I include it here.
   * */
  aggRecord.members = {
    type: 'SUBTABLE',
    value: customerIds.map(({ id }, idx) => {
      return {
        id: '', // this is auto-populated
        value: {
          customerId: { value: id },
          postal: { value: 'auto' },
          address1: { value: 'auto' },
          address2: { value: 'auto' },
          customerName: { value: 'auto' },
          dump: { value: JSON.stringify(customerRecords[idx]) },
        },
      };
    }),
  };

  aggRecord.custNames = {
    value: customerRecords
      .filter(({ fullName })=> !!fullName?.value)
      .map(({ fullName }) => `${fullName?.value}`)
      .join(', '),
  };
  aggRecord.cocoAGNames = {
    value: getAgentNames(record, 'cocoAG'),
  };
  aggRecord.yumeAGNames = {
    value: getAgentNames(record, 'yumeAG'),
  };

  return saveRecord({
    appId: APPIDS.custGroup,
    recordId: custGroupId,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: custGroupId ? () => updateRelatedToCustGroup(record, custGroupId) : undefined,
  });
};