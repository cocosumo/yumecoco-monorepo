import { CustomerGroupForm } from './../../../types/forms';
import validateFormState from './validateFormState';
import addTransactCustomers from './addTransactCustomers';

type SubmitForm = <T extends CustomerGroupForm>(state: T) => T;

/**
 * Validate then submit the form if no errors
 *
 * @param state
 * @returns
 * @deprecated No flexibility to update state based on fetch status.
 */
const submitForm: SubmitForm = (state) => {
  /** Toggle isSubmitted, then validate each field */

  const validatedForm = validateFormState(state);

  if (!validatedForm.hasError) {
    console.log('no errors');
    addTransactCustomers(state);
  }

  return validatedForm;
};

export default submitForm;