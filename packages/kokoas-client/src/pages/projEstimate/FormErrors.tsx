import { useFormState } from 'react-hook-form';

export const FormErrors = () => {
  const { errors, isDirty } = useFormState();
  //console.log(errors, isDirty);
  return (<div />);
};