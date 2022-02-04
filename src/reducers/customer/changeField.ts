import { SelectChangeEvent } from '@mui/material';
import validationMessage from '../../helpers/validations';
import { CustomerForm, InputChangeType, FieldValidation } from './../../types/forms';

const changeField = (state: CustomerForm, event: InputChangeType, index: number | undefined) : CustomerForm => {
  const name = event.target.name;
  const value = event.target.value;
  const hasError = event.target.hasAttribute('validity');

  console.log(hasError);

  if (typeof index === 'undefined') {
    return state;
  } else {
    console.log(name, value, index);
    const customersCopy = [...state.customers];
    const newInputState: FieldValidation  = { value, touched: true, hasError: !event.target.validity.valid, errorMsg: validationMessage(event.target.validity) };

    const customerCopy = { ...customersCopy[index], [name]: newInputState };
    customersCopy.splice(index, 1, customerCopy);
    return { ...state, customers: customersCopy };
  }
};

export const changeSelectField = (state: CustomerForm, event:  SelectChangeEvent<string>, index: number | undefined) : CustomerForm => {
  const name = event.target.name;
  const value = event.target.value;

  if (typeof index === 'undefined') {
    return state;
  } else {
    console.log(name, value, index);
    const customersCopy = [...state.customers];
    const newInputState: FieldValidation  = { value, touched: true, hasError: false, errorMsg: '' };
    const customerCopy = { ...customersCopy[index], [name]: newInputState };
    customersCopy.splice(index, 1, customerCopy);
    return { ...state, customers: customersCopy };
  }
};


export default changeField;