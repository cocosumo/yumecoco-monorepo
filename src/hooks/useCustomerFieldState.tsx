import { useContext } from 'react';
import CustomerFormContext from '../context/CustomerFormContext';
import { InputField } from '../types/forms';

type UseShowErrorFunc = (field: InputField) => Partial<InputField>;

const useCustomerFieldState : UseShowErrorFunc = ({ hasError, touched }) => {
  const isSubmitted = useContext(CustomerFormContext)!.formState.isSubmitted;

  return {
    hasError: hasError && (touched || isSubmitted),

  };
};

export default useCustomerFieldState;