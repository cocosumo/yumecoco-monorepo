import { CustomerForm, CustomerInstancePayload } from '../../../types/forms';

type RemoveFunction = (state: CustomerForm, payload: CustomerInstancePayload ) => CustomerForm;

const removeCustomer : RemoveFunction = (state, payload) => {
  const customersCopy = [...state.customers];
  customersCopy.splice(payload.customerIdx, 1);

  return { ...state, customers: customersCopy };
};

export default removeCustomer;