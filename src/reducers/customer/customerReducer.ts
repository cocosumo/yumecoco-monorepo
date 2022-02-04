import { CustomerForm, FieldActionType } from './../../types/forms';


import initialFormState from '../../stores/customer';
import changeField, { changeSelectField } from './changeField';
import removeCustomer from './removeCustomer';


const customerReducer = (state: CustomerForm, action: FieldActionType) : CustomerForm => {
  console.log(state);

  switch (action.type){
    case 'CHANGE':
      return changeField(state, action.payload, action.index);
    case 'ADD':
      return { ...state, customers: [...state.customers.concat(initialFormState.customers) ] };
    case 'REMOVE':
      return removeCustomer(state, action.index);
    case 'SELECT_CHANGE':
      return changeSelectField(state, action.payload, action.index);
    case 'CHANGE_BIRTHDATE':

      console.log(action, action.payload.getFullYear());
  }

  return state;

};

export default customerReducer;