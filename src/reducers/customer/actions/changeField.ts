import  { validate } from '../../../helpers/validations';
import { CustomerGroupForm, FieldPayload } from '../../../types/form.customer';
import { InputField } from '../../../types/forms';

interface UpdateCustomerStateParam {
  state: CustomerGroupForm,
  name: string,
  value: string,
  index: number
}



type ChangeFunction = (state: CustomerGroupForm, payload: FieldPayload ) => CustomerGroupForm;



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


export const changeBirthYear = (state: CustomerGroupForm, date: Date, index: number | undefined) : CustomerGroupForm => {
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