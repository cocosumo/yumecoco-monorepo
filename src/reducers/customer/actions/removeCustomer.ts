import { CustomerForm, Payload } from '../../../types/forms';

type RemoveFunction = (state: CustomerForm, payload: Payload ) => CustomerForm;

const removeCustomer : RemoveFunction = (state, payload) => {
  const customersCopy = [...state.customers];
  customersCopy.splice(payload.customerIdx, 1);

  return { ...state, customers: customersCopy };
};

export default removeCustomer;