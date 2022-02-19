import React from 'react';
import { CustomerGroupForm, FieldActionType } from '../types/form.customer';

interface IContextProps {
  formState: CustomerGroupForm;
  dispatch: (action: FieldActionType) => void;
}

const CustomerFormContext = React.createContext<null | IContextProps>(null);

export function useCustomContext() {
  return React.useContext(CustomerFormContext);
}

export default CustomerFormContext;