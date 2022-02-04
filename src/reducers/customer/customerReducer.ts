

/* const updateField = (state: CustomerForm, changeEvent: React.ChangeEvent ) => {
  return {}
}; */


import initialFormState from '../../stores/customer';
import changeField from './changeField';
import removeCustomer from './removeCustomer';


const customerReducer = (state: CustomerForm, action: FieldActionType) : CustomerForm => {
  console.log(state);

  switch (action.type){
    case 'CHANGE':
      return changeField(state, action.payload, action.index);
    case 'ADD':
      return { ...state, customers: [...state.customers.concat(initialFormState.customers) ] };
    case 'REMOVE':
      /* const customersCopy = [...state.customers];
      customersCopy.splice(action.index, 1);
      return { ...state, customers: customersCopy }; */
      return removeCustomer(state, action.index);
  }

};

export default customerReducer;