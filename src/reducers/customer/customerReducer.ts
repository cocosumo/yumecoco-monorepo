import { CustomerGroupForm, FieldActionType } from './../../types/forms';


import initialFormState from '../../stores/customer';
import changeField from './actions/changeField';
import { changeContact } from './actions/changeContact';
import removeCustomer from './actions/removeCustomer';
import setSameAsMain from './actions/setSameAsMain';
import changeAgent from './actions/changeAgent';
import { validate } from '../../helpers/validations';
import changeSubmitState from './actions/changeSubmitState';
import { getGroupData } from './actions/getGroupData';


const customerReducer = (state: CustomerGroupForm, action: FieldActionType): CustomerGroupForm => {

  switch (action.type) {
    case 'CHANGE_AGENT':
      return changeAgent(state, action.payload);

    case 'CHANGE_STORE':
      return { ...state, store: validate({ ...state.store, value: action.payload.element.target.value }) };

    case 'CHANGE_CUST_INSTANCE':
      return changeField(state, action.payload);

    case 'ADD':
      return { ...state, customers: [...state.customers.concat(initialFormState.customers)] };
    case 'REMOVE':
      return removeCustomer(state, action.payload);

    case 'SELECT_CHANGE':
      return changeField(state, action.payload);

    case 'CHANGE_BIRTHYEAR':
      return changeField(state, action.payload);

    case 'CHANGE_CONTACT_VALUE':
      return changeContact(state, action.payload);

    case 'SET_SAME_AS_MAIN':
      return setSameAsMain(state, action.payload);

    case 'CHANGE_SUBMITSTATE':
      return changeSubmitState(state, action.payload);

    case 'GET_GROUP_DATA':
      return getGroupData(state, action.payload);


    default:
      throw new Error('わざとエラーです。Lenz! Fix this! lenzras@gmail.com. Unhandled action ' + action.type);
  }


};

export default customerReducer;