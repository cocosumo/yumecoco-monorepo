import { CustomerGroupForm } from './../../../types/forms';
import { convertCustFormState } from '../../../helpers/normalizers';
import { addCustomersInGroup } from '../../../api/kintone/transactions/addCustomersInGroup';

const addTransactCustomers = async (state: CustomerGroupForm) => {
  const kintoneRecord = convertCustFormState(state);



  return addCustomersInGroup(kintoneRecord);

};

export default addTransactCustomers;