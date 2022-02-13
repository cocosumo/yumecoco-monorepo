import { addCustomers } from '../customers/POST';
import { addCustGroup } from '../custgroups/POST';
import { AddRecordResult, AddRecordsResult, RecordParam } from '../restapi';
import { custIdsToGroupMems } from '../../../helpers/normalizers';


export type AddCustomersInGroupResult = {
  customers: AddRecordsResult,
  group: AddRecordResult
};
type AddCustomersInGroup = (transactionPayload: { customers: RecordParam[], group: RecordParam }) => Promise<AddCustomersInGroupResult>;


export const addCustomersInGroup : AddCustomersInGroup  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const resultCust = await addCustomers(customers);

  const resultGroup = await addCustGroup({ ...group, members: custIdsToGroupMems(resultCust.ids) });

  return { customers: resultCust, group: resultGroup };
};