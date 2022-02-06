import { CustomerForm, Payload } from '../../../types/forms';

type SetSameAsMain = (state: CustomerForm, payload: Payload) => CustomerForm;

const setSameAsMain: SetSameAsMain = (state, payload) => {

  return { 
    ...state, customers: [
      ...state.customers.map(
        (customer, custIdx) => {
          if (custIdx === payload.customerIdx){
            return { ...customer, isSameAsMain: !customer.isSameAsMain };
          }
          return customer;
        },
      ),
    ], 
  };
};

export default setSameAsMain;