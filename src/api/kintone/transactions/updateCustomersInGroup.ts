
import { AddRecordResult, UpdateRecordParam } from '../restapi';
import { updateCustomers } from '../customers/POST';


interface UpdatesResult {
  records: {
    id: string;
    revision: string;
  }[]
}

export type UpdateCustomersInGroupResult = {
  customers: UpdatesResult,
  group: AddRecordResult | null
};

export interface CustomersInGroupRecords {
  customers: UpdateRecordParam[],
  group: UpdateRecordParam
}

type AddCustomersInGroup = (transactionPayload: CustomersInGroupRecords) => Promise<UpdateCustomersInGroupResult>;


export const updateCustomersInGroup : AddCustomersInGroup  = async (transactionPayload) => {
  const { customers, group } = transactionPayload;

  console.log(group, 'customers');

  const resultCust = await updateCustomers(customers);

  console.log(resultCust, 'RESULT');
  return { customers: resultCust, group: null };
};