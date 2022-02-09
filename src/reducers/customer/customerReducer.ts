import { CustomerForm, FieldActionType } from './../../types/forms';


import initialFormState from '../../stores/customer';
import changeField from './actions/changeField';
import { changeContact } from './actions/changeContact';
import removeCustomer from './actions/removeCustomer';
import setSameAsMain from './actions/setSameAsMain';
import submitForm from './actions/submitForm';
import changeAgent from './actions/changeAgent';
import { validate } from '../../helpers/validations';


const customerReducer = (state: CustomerForm, action: FieldActionType) : CustomerForm => {

  switch (action.type){
    case 'CHANGE_AGENT':
      return changeAgent(state, action.payload);

    case 'CHANGE_STORE':
      return { ...state, store: validate({ ...state.store, value: action.payload.element.target.value }) };

    case 'CHANGE_CUST_INSTANCE':
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