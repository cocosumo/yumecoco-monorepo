import { CustomerGroupForm } from '../../../types/form.customer';
import { convertCustFormState, convertFormStateForUpdate } from './../actions/helpers/converters';
import { addCustomersInGroup } from '../../../api/kintone/transactions/addCustomersInGroup';

import { updateCustomersInGroup } from '../../../api/kintone/transactions/updateCustomersInGroup';


const UpsertCustomers = async (state: CustomerGroupForm) => {

  if (!!!state.groupId){
    /* new record */
    const kintoneRecord = convertCustFormState(state);
    return addCustomersInGroup(kintoneRecord);

  } else {
    const updateRecord =  convertFormStateForUpdate(state);
    return updateCustomersInGroup(updateRecord);
  }

};

export default UpsertCustomers;