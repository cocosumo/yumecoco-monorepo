import { validate } from '../../../helpers/validations';
import { CustomerForm, InputField } from './../../../types/forms';
import { isArray, isObject, isField } from './../../../helpers/utils';
import { convertCustFormState } from '../../../helpers/normalizers';
import { addCustomersWithGroup } from '../../../api/kintone/transactions/addCustomersWithGroup';

type SubmitForm = (state: CustomerForm) => CustomerForm;


export const transactCustomers = async (state: CustomerForm) => {
  const kintoneRecord = convertCustFormState(state);
  return addCustomersWithGroup(kintoneRecord);
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

  if (isObject(state)) {

    /*if field object, validate field, then pop out of the function */
    if (isField(state as object)) {
      const newFieldState = validate((state as InputField));
      if (newFieldState.hasError) hasError = true;
      return newFieldState;
    }

    newState = Object.entries(state)
      .reduce((prev, [fieldName, value]) => {
        return { ...prev, [fieldName]: traverseState(value) };
      }, {});

  } else if (isArray(state)) {

    newState = (state as any[]).map((item) => {
      if (isField(item)) {
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

const submitForm: SubmitForm = (state) => {
  /** Toggle isSubmitted, then validate each field */

  hasError = false;
  const validatedForm = { ...traverseState({ ...state, isSubmitted: true }), hasError };

  if (!hasError) {
    transactCustomers(state);
  }

  return validatedForm;
};

export default submitForm;