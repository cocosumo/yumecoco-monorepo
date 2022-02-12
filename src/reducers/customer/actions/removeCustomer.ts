import { CustomerGroupForm, CustomerInstancePayload } from '../../../types/forms';

type RemoveFunction = (state: CustomerGroupForm, payload: CustomerInstancePayload ) => CustomerGroupForm;

const removeCustomer : RemoveFunction = (state, payload) => {
  const customersCopy = [...state.customers];
  customersCopy.splice(payload.customerIdx, 1);

  return { ...state, customers: customersCopy };
};

export default removeCustomer;