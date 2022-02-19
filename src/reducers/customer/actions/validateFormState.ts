import { validate } from '../../../helpers/validations';
import { CustomerGroupForm } from '../../../types/form.customer';
import { InputField } from '../../../types/forms';

const validateFormState = <T extends CustomerGroupForm>(state: T): T => {
  let hasError = false;

  const setHasError = (field: InputField) => {
    const res = validate(field);

    if (res.hasError) hasError = true;

    return res;
  };


  const validatedCustomerInstances: T['customers'] = state.customers.map((cust, custIdx) => {
    const { fullName, fullNameReading, postalCode, address1, address2, isSameAsMain, contacts } = cust;

    const resolveField = (field: InputField) => {

      if (custIdx === 0 || (custIdx > 0 && !isSameAsMain)) return setHasError(field);

      return field;
    };

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


  const validateCommon = {
    ...state,
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


  console.log('HASERROR', hasError, validateCommon);

  return {
    ...validateCommon,
    isSubmitted: true,
    hasError,
  };
};

export default validateFormState;