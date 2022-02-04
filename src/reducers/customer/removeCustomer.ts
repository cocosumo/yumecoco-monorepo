import { CustomerForm } from '../../types/forms';

const removeCustomer = (state: CustomerForm, index: number) => {
  const customersCopy = [...state.customers];
  customersCopy.splice(index, 1);

  return { ...state, customers: customersCopy };
};

export default removeCustomer;