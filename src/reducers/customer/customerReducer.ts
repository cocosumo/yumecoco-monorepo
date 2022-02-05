import { CustomerForm, FieldActionType } from './../../types/forms';


import initialFormState from '../../stores/customer';
import changeField, { changeBirthYear } from './actions/changeField';
import { changeContact } from './actions/changeContact';
import removeCustomer from './actions/removeCustomer';


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
      return changeField(state, action.payload, action.index);
    case 'CHANGE_BIRTHYEAR':
      return changeBirthYear(state, action.payload, action.index);
    case 'CHANGE_CONTACT_TEXT':
      return changeContact(state, action.payload);
    case 'CHANGE_CONTACT_CLASS':
      return changeContact(state, action.payload, true);
    default:
      throw new Error('わざとエラーです。Lenz! Fix this! lenzras@gmail.com');
  }


};

export default customerReducer;