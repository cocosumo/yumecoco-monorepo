import { saveRecord } from '../common/saveRecord';
import { saveCustomers } from '../customers/saveCustomers';
import { APPIDS } from './../config';
import { getAgentNames } from './getAgentNames';
import { updateRelatedToCustGroup } from './updateRelatedToCustGroup';

export const saveCustGroup = async (
  {
    record,
    custGroupId,
    revision,
    customerRecords,
  }:
  {
    record: Partial<CustomerGroupTypes.SavedData>,
    custGroupId?: string,
    revision?:string,
    customerRecords: Partial<CustomerTypes.SavedData>[]
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


  /** Save customer records to db.customers and retrieve customer ids */
  const customerIds = await saveCustomers({ records: customerRecords });

  /** Populate db.custGroup.members with the customerIds  */

  aggRecord.members = {
    type: 'SUBTABLE',
    value: customerIds.map(({ id }, idx) => {
      return {
        id: 'auto',
        value: {
          customerId: { value: id },
          postal: { value: 'auto' },
          address1: { value: 'auto' },
          address2: { value: 'auto' },
          customerName: { value: 'auto' },
          dump: { value: JSON.stringify(customerRecords[idx], null, 2) },
        },
      };
    }),
  };

  return saveRecord({
    appId: APPIDS.custGroup,
    record: aggRecord,
    revision: revision,
    updateRelatedFn: custGroupId ? () => updateRelatedToCustGroup(record, custGroupId) : undefined,
  });
};