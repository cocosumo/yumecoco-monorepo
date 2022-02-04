import React from 'react';
import { CustomerForm, FieldActionType } from './../types/forms';

interface IContextProps {
  formState: CustomerForm;
  dispatch: (action: FieldActionType) => void;
}

const CustomerFormContext = React.createContext<null | IContextProps>(null);

export function useCustomContext() {
  return React.useContext(CustomerFormContext);
}

export default CustomerFormContext;