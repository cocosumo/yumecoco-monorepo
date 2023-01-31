import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { DevTool } from '@hookform/devtools';
import { Grid } from '@mui/material';

export const FilterForm = ({
  children,
  useFormMethods,
}: {
  children: ReactNode,
  useFormMethods: UseFormReturn<TypeOfForm>
}) => {

  const {
    control,
  } = useFormMethods;



  return (
    <Grid item xs={12} md={8}>
      <FormProvider {...useFormMethods}>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          {children}
        </form>
        <DevTool control={control} />
      </FormProvider >
    </Grid>
  );
};