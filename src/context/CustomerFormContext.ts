import React from 'react';

interface IContextProps {
  formState: CustomerForm;
  dispatch: (action: FieldActionType) => void;
}

const CustomerFormContext = React.createContext<null | IContextProps>(null);

export function useCustomContext() {
  return React.useContext(CustomerFormContext);
}

export default CustomerFormContext;