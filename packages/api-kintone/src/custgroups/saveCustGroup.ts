import { appId, RecordType } from './config';
import { ICustomers } from 'types';
//import { saveCustomers } from '../customers/saveCustomers';

import { getAgentNames } from './getAgentNames';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';
import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';

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
    record: Partial<RecordType>,
    custGroupId?: string,
    revision?:string,
    /** @deprecated save Customers prior to calling this function */
    customerRecords?: Partial<ICustomers>[]
  },
) => {

  console.log('SAVING CUSTGROUP...');
  /** Create copy of record to populate aggregates. */
  const aggRecord = { ...record }; // avoid argument mutation.



  if (customerRecords) {
    //console.log('SAVING customerRecords...');

    /** THIS BLOCK IS DEPRECATED. */
    /** Save customer records to db.customers and retrieve customer ids */
    //const savedCustomers = await saveCustomers({ records: customerRecords });
    /*  const custIds = savedCustomers.map(({ uuid }) => uuid?.value)
      .filter(Boolean); */

    /**
     * Populate db.custGroup.members with the customerIds
     *
     * value: "auto" are copy fields. These are not required by kintone,
     * but for the sake of clarity, I include it here.
     * */
    /*  aggRecord.members = {
      type: 'SUBTABLE',
      value: custIds?.map((custId, index) => {
        return {
          id: '', // this is auto-populated
          value: {
            postal: { value: 'auto' },
            address1: { value: 'auto' },
            address2: { value: 'auto' },
            customerName: { value: 'auto' },
            custId: { value: custId || '' },
            custNameReading: { value: 'auto' },
            index: { value: String(index) },
            isSameAsMain: { value: savedCustomers.find(({ uuid }) => uuid?.value === custId)?.isSameAsMain?.value || '0' },
          },
        };
      }),
    }; */

    /* aggRecord.custNames = {
      value: customerRecords
        .filter(({ fullName })=> !!fullName?.value)
        .map(({ fullName }) => `${fullName?.value}`)
        .join(', '),
    }; */
  }

  aggRecord.cocoAGNames = {
    value: getAgentNames(record, 'cocoAG'),
  };
  aggRecord.yumeAGNames = {
    value: getAgentNames(record, 'yumeAG'),
  };

  const result = await saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: custGroupId || '',
    },
    record: aggRecord,
    revision: revision,
  });

  if (custGroupId) {
    await updateRelatedToCustGroup(custGroupId);
  }


  return result;
};