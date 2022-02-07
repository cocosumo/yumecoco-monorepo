import { CustomerForm, CustomerInstancePayload } from '../../../types/forms';

type SetSameAsMain = (state: CustomerForm, payload: CustomerInstancePayload) => CustomerForm;

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