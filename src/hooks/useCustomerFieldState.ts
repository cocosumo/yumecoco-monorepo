import { useContext } from 'react';
import CustomerFormContext from '../context/CustomerFormContext';

type UseShowErrorFunc = (field: InputField) => Partial<InputField>;

export const useCustomerFieldState : UseShowErrorFunc = ({ hasError, touched }) => {
  const isSubmitted = useContext(CustomerFormContext)!.formState.isSubmitted;

  return {
    hasError: hasError && (touched || isSubmitted),
  };
};

export default useCustomerFieldState;