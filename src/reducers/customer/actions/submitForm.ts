import { validate } from '../../../helpers/validations';
import { CustomerForm, InputField } from './../../../types/forms';
import { convertCustFormState } from '../../../helpers/normalizers';
import { addCustomersWithGroup } from '../../../api/kintone/transactions/addCustomersWithGroup';

type SubmitForm = (state: CustomerForm) => CustomerForm;


export const transactCustomers = async (state: CustomerForm) => {
  const kintoneRecord = convertCustFormState(state);
  return addCustomersWithGroup(kintoneRecord);
};

/**
 * Traverses each node in the form state and validates it.
 *
 * @param state
 * @returns validated tree node of the form state
 */
/* const traverseState = (state: any) => {

  let newState: any;

  if (isObject(state)) {

    
    if (isField(state as object)){
      console.log('IS FIELD IN OBJECT', state);
      const newFieldState = validate((state as InputField));
      if (newFieldState.hasError) hasError = true;
      return newFieldState;
    }

    newState = Object.entries(state)
      .reduce((prev, [fieldName, fieldValue])=>{
        console.log('value',  fieldValue);
        return { ...prev, [fieldName]: traverseState(fieldValue) };
      }, {});

  } else if (isArray(state)) {

    newState = (state as any[]).map((item) => {
      console.log(item);
      if (isField(item)){
        console.log(item);
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

}; */

const validateFormState = <T extends CustomerForm>(state: T): T => {
  let hasError = false;

  const setHasError = (field: InputField) => {
    const res = validate(field);

    if (res.hasError) hasError = true;
    return res;
  };

  const validatedCustomerInstances: T['customers'] = state.customers.map((cust) => {
    const { fullName, fullNameReading, postalCode, address1, address2, isSameAsMain, contacts } = cust;

    const resolveField = (field: InputField) => isSameAsMain ? field : setHasError(field);

    return {
      ...cust,
      fullName: setHasError(fullName),
      fullNameReading: setHasError(fullNameReading),
      postalCode: resolveField(postalCode),
      address1: resolveField(address1),
      address2: resolveField(address2),
      contacts: contacts.map((contactRow) => {
        const { contactValue, classification } = contactRow;
        return {
          ...contactRow,
          contactValue: resolveField(contactValue),
          classification: resolveField(classification),
        };
      }),
    };
  });

  return {
    ...state,
    hasError,
    store: setHasError(state.store),
    customers: validatedCustomerInstances,
    agents: {
      ...state.agents,
      coco1: setHasError(state.agents.coco1),
      coco2: setHasError(state.agents.coco2),
      yume1: setHasError(state.agents.yume1),
      yume2: setHasError(state.agents.yume2),
    },
  };
};

const submitForm: SubmitForm = (state) => {
  /** Toggle isSubmitted, then validate each field */

  const validatedForm = validateFormState(state);

  if (!validatedForm.hasError) {
    console.log('no errors');
    transactCustomers(state);
  }

  return validatedForm;
};

export default submitForm;