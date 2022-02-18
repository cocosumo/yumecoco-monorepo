import { addCustomers } from '../customers/POST';
import { addCustGroup } from '../custgroups/POST';
import { AddCustFn } from '../restapi';
import { custIdsToGroupMems } from '../../../helpers/normalizers';



export const addCustomersInGroup : AddCustFn  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  const resultCust = await addCustomers(customers);

  const resultGroup = await addCustGroup({ ...group, members: custIdsToGroupMems(resultCust.ids) });

  return { customers: resultCust, group: resultGroup };
};