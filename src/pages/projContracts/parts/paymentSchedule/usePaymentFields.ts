import { useField } from 'formik';
import { ComponentProps } from 'react';
import { PaymentField } from './PaymentField';

export const usePaymentField = (name: ComponentProps<typeof PaymentField>['name']) => {

  const chkProps = useField(`${name}_chk`);
  const amtProps = useField(`${name}_amt`);
  const dateProps = useField(`${name}_date`);

  return {
    chkProps,
    amtProps,
    dateProps,
  };

};