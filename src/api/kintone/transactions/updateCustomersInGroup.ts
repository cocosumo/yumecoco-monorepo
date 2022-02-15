
import { UpdatesResult, UpdateRecordParam, FetchResult } from '../restapi';
import {  updateCustomers } from '../customers/POST';
import { updateGroup } from '../custgroups/POST';




export type UpdateCustomersInGroupResult = {
  customers: UpdatesResult,
  group: FetchResult
};

export interface CustomersInGroupRecords {
  customers: UpdateRecordParam[],
  group: UpdateRecordParam
}

type AddCustomersInGroup = (transactionPayload: CustomersInGroupRecords) => Promise<UpdateCustomersInGroupResult>;


export const updateCustomersInGroup : AddCustomersInGroup  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const resultCust = await updateCustomers(customers);
  const resultGroup = await updateGroup(group);


  return { customers: resultCust, group: { ...resultGroup, id: group.id } };
};