
import { RecordParam, UpdateCustFn, UpsertRecordsResult } from '../restapi';
import {  updateCustomers } from '../customers/PUT';
import { addCustomers } from '../customers/POST';
import { updateGroup } from '../custgroups/PUT';

import { custIdsToGroupMems } from '../../../reducers/customer/actions/helpers/converters';

export const updateCustomersInGroup : UpdateCustFn  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const unregisteredCust = customers.filter((cust) =>  !cust.id);

  const resultCust = await updateCustomers(customers.filter((cust) => !!cust.id));

  let updatedCust : UpsertRecordsResult = resultCust ;

  if (unregisteredCust.length > 0) {
    /*
    Commenting this as kintone have inconsistencies in API rules.
    Kintone's UPDATE accepts {id: string, record : {[key]: {value: string}}}[] while
     ADD accepts {[key]: {value: string}}[] so convert accordingly.
     */
    const newCust = await addCustomers(unregisteredCust.map((cust) => cust.record as RecordParam));

    /* Combine updates and add */
    updatedCust = { ...resultCust,
      ids: resultCust.ids.concat(newCust.ids),
      revisions: resultCust.revisions.concat(newCust.revisions),
    };

  }

  const resultGroup = await updateGroup({
    ...group,
    record: {
      ...group.record,
      members: custIdsToGroupMems(updatedCust.ids),
    },
  } );

  return { customers: updatedCust, group: { ...resultGroup, id: group.id } };
};