import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const FormContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useForm();

  return (
    <Grid item xs={12}>
      <FormProvider {...methods}>
        <form>
          {children}
        </form>
      </FormProvider>
    </Grid>

  );
};