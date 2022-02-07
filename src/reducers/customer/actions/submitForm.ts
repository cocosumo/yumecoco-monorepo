import { validate } from '../../../helpers/validations';
import { CustomerForm, InputField } from './../../../types/forms';

type SubmitForm = (state: CustomerForm) => CustomerForm;

const isArray = (value : any) => Array.isArray(value);
const isObject = (value : any) => !!(value && typeof value === 'object' && !isArray(value));
const isField = (value: object) =>  ('label' in value && 'value' in value);

/**
 * Traverses each node in the form state and validates it.
 *
 * @param state
 * @returns validated tree node of the form state
 */
const traverseState = (state: any) => {

  let newState: any;
  if (isObject(state)){

    /* validate if field */
    if (isField(state as object)){
      return validate((state as InputField));
    }

    /* If not a field, traverse property node */
    newState = Object.entries(state)
      .reduce((prev, [fieldName, value])=>{
        return { ...prev, [fieldName]: traverseState(value) };
      }, {});
  } else if (isArray(state)){

    // traverse array node
    newState = (state as any[]).map((item) => {
      return traverseState(item);
    });
  } else {

    return state;
  }

  return newState;

};

const submitForm : SubmitForm = (state) => {
  /** Toggle isSubmitted, then validate each field */
  return traverseState({ ...state, isSubmitted: true });
};

export default submitForm;