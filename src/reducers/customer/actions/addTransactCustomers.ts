import { CustomerGroupForm } from './../../../types/forms';
import { convertCustFormState, convertFormStateForUpdate } from '../../../helpers/normalizers';
import { addCustomersInGroup } from '../../../api/kintone/transactions/addCustomersInGroup';

import { updateCustomersInGroup } from '../../../api/kintone/transactions/updateCustomersInGroup';


const addTransactCustomers = async (state: CustomerGroupForm) => {
  console.log(state.groupId, !!state.groupId );
  if (!!!state.groupId){
    const kintoneRecord = convertCustFormState(state);
    return addCustomersInGroup(kintoneRecord);

  } else {
    const updateRecord =  convertFormStateForUpdate(state);
    return updateCustomersInGroup(updateRecord);

  }

};

export default addTransactCustomers;