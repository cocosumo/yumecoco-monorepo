import { CustomerForm, FieldActionType } from './../../types/forms';


import initialFormState from '../../stores/customer';
import changeField from './actions/changeField';
import { changeContact } from './actions/changeContact';
import removeCustomer from './actions/removeCustomer';
import setSameAsMain from './actions/setSameAsMain';
import submitForm from './actions/submitForm';


const customerReducer = (state: CustomerForm, action: FieldActionType) : CustomerForm => {
  console.log(state);

  switch (action.type){
    case 'CHANGE':
      return changeField(state, action.payload);
    case 'ADD':
      return { ...state, customers: [...state.customers.concat(initialFormState.customers) ] };
    case 'REMOVE':
      return removeCustomer(state, action.payload);
    case 'SELECT_CHANGE':
      return changeField(state, action.payload);
    case 'CHANGE_BIRTHYEAR':
      return changeField(state, action.payload);
    case 'CHANGE_CONTACT_TEXT':
      console.log(action.payload, 'CONTACTPAYLOAD');
      return changeContact(state, action.payload);
    case 'CHANGE_CONTACT_CLASS':
      return changeContact(state, action.payload, true);
    case 'SET_SAME_AS_MAIN':
      return setSameAsMain(state, action.payload);
    case 'SUBMIT':
      return submitForm(state);
    default:
      throw new Error('わざとエラーです。Lenz! Fix this! lenzras@gmail.com');
  }


};

export default customerReducer;