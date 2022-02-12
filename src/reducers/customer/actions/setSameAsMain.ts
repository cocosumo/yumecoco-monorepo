import { CustomerGroupForm, CustomerInstancePayload } from '../../../types/forms';

type SetSameAsMain = (state: CustomerGroupForm, payload: CustomerInstancePayload) => CustomerGroupForm;

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