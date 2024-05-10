import { Stack } from '@mui/material';
import { ReactNode } from 'react';
//import { Form, FormProvider, UseFormReturn } from 'react-hook-form';
//import { TForm } from './schema';

export const FormOrderInvoiceContainer = ({
  children,
  //formReturn,
}:{
  children: ReactNode,
  //formReturn: UseFormReturn<TForm>
}) => {


  return (
  //<FormProvider {...formReturn}>
  //  <Form
  //noValidate
  //  >
    <Stack spacing={2}>
      {children}
    </Stack>
  //  </Form>
  //</FormProvider>
  );
};