import { addCustomers } from '../customers/POST';
import { addCustGroup } from '../custgroups/POST';
import { RecordParam } from '../restapi';
import { custIdsToGroupMems } from '../../../helpers/normalizers';


export type AddCustomersInGroupResult = {
  /* To do */
  customers: any,
  group: any
};

export interface CustomersInGroupRecords {
  customers: RecordParam[],
  group: RecordParam
}
type AddCustomersInGroup = (transactionPayload: CustomersInGroupRecords) => Promise<AddCustomersInGroupResult>;


export const addCustomersInGroup : AddCustomersInGroup  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const resultCust = await addCustomers(customers);

  const resultGroup = await addCustGroup({ ...group, members: custIdsToGroupMems(resultCust.ids) });

  return { customers: resultCust, group: resultGroup };
};