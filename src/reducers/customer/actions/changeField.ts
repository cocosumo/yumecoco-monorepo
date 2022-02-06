import  { validate } from '../../../helpers/validations';
import { CustomerForm, FieldPayload, InputField } from './../../../types/forms';

interface UpdateCustomerStateParam {
  state: CustomerForm,
  name: string,
  value: string,
  index: number
}



type ChangeFunction = (state: CustomerForm, payload: FieldPayload ) => CustomerForm;



const updateCustomerState = ({ state, name, value, index } : UpdateCustomerStateParam) => {
  /* Update immutably */

  return { ...state, customers: [
    ...state.customers.map((customer, custIdx) => {
      if (custIdx === index) {
        const fieldPtr = <InputField>customer[name];
        const newInputState = validate({ ...fieldPtr, ...{ value: value.toString(), touched: true }  });

        return { ...customer, [name]: newInputState };
      }
      return customer;
    }),
  ] };
};



const changeTextField: ChangeFunction = (state, payload) => {
  const { element, customerIdx } = payload;

  const name = element.target.name;
  const value = element.target.value;
  const index = customerIdx;

  return updateCustomerState({ state, name, value, index });
  
};


export const changeBirthYear = (state: CustomerForm, date: Date, index: number | undefined) : CustomerForm => {
  if (typeof index === 'undefined') return state;

  const year = date?.getFullYear().toString();

  return updateCustomerState({
    state, 
    name: 'birthYear', 
    value: year ? year : '',
    index,
  });
};



export default changeTextField;