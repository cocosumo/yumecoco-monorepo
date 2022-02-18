
import { UpdateCustFn } from '../restapi';
import {  updateCustomers } from '../customers/PUT';
import { updateGroup } from '../custgroups/POST';
import { resultToStrArray } from '../helpers/utils';


/*

export type UpdateCustomersInGroupResult = {
  customers: UpdatesResult,
  group: FetchResult
};

export interface CustomersInGroupRecords {
  customers: UpdateRecordParam[],
  group: UpdateRecordParam
}

type AddCustomersInGroup = (transactionPayload: CustomersInGroupRecords) => Promise<UpdateCustomersInGroupResult>;

 */


export const updateCustomersInGroup : UpdateCustFn  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const resultCust = await updateCustomers(customers);
  const resultGroup = await updateGroup(group);

  return { customers: resultToStrArray(resultCust), group: { ...resultGroup, id: group.id } };
};