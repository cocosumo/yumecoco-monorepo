import { addCustomers } from '../../../api/kintone/customers/POST';
import { validate } from '../../../helpers/validations';
import { CustomerForm, InputField } from './../../../types/forms';
import { isArray, isObject, isField } from './../../../helpers/utils';
import { convertCustFormState } from '../../../helpers/normalizers';
import { AddRecordResult } from './../../../api/kintone/customers/customers';

type SubmitForm = (state: CustomerForm) => CustomerForm;


export const addCustomersByFormState = async (state: CustomerForm) : Promise<AddRecordResult> => {
  const kintoneRecord = convertCustFormState(state);
  return addCustomers(kintoneRecord);
};

let hasError = false;
/**
 * Traverses each node in the form state and validates it.
 *
 * @param state
 * @returns validated tree node of the form state
 */
const traverseState = (state: any) => {

  let newState: any;

  if (isObject(state)){

    /*if field object, validate field, then pop out of the function */
    if (isField(state as object)){
      const newFieldState = validate((state as InputField));
      if (newFieldState.hasError) hasError = true;
      return newFieldState;
    }

    newState = Object.entries(state)
      .reduce((prev, [fieldName, value])=>{
        return { ...prev, [fieldName]: traverseState(value) };
      }, {});

  } else if (isArray(state)){

    newState = (state as any[]).map((item) => {
      if (isField(item)){
        const newFieldState = validate((state as InputField));
        if (newFieldState.hasError) hasError = true;
        return newFieldState;
      }
      return traverseState(item);
    });

  } else {

    return state;
  }

  return newState;

};

const submitForm : SubmitForm = (state) => {
  /** Toggle isSubmitted, then validate each field */

  hasError = false;
  const validatedForm = { ...traverseState({ ...state, isSubmitted: true }), hasError };

  if (!hasError){
    addCustomersByFormState(state);
  }

  return validatedForm;
};

export default submitForm;