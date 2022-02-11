import { addCustomers } from '../customers/POST';
import { addCustGroup } from '../custgroups/POST';
import { RecordParam } from '../restapi';
import { custIdsToGroupMems } from '../../../helpers/normalizers';



type AddCustomersWithGroup = { customers: RecordParam[], group: RecordParam };

export const addCustomersWithGroup = async (transactionPayload: AddCustomersWithGroup) => {
  const { customers, group } = transactionPayload;
  const resultCust = await addCustomers(customers);
  const resultGroup = await addCustGroup({ ...group, members: custIdsToGroupMems(resultCust.ids) });

  return { customers: resultCust, group: resultGroup };
};