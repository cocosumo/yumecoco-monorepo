import { CustomerForm } from './../../../types/forms';
import { convertCustFormState } from '../../../helpers/normalizers';
import { addCustomersWithGroup } from '../../../api/kintone/transactions/addCustomersWithGroup';

const addTransactCustomers = async (state: CustomerForm) => {
  const kintoneRecord = convertCustFormState(state);
  return addCustomersWithGroup(kintoneRecord);

};

export default addTransactCustomers;