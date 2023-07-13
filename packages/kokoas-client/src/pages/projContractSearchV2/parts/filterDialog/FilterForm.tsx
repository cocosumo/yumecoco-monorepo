import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { TForm } from '../../schema';

export const FilterForm = ({
  children,
  useFormMethods,
}: {
  children: ReactNode,
  useFormMethods: UseFormReturn<TForm>
}) => {

  const {
    control,
  } = useFormMethods;



  return (

    <FormProvider {...useFormMethods}>
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        {children}
      </form>
      <DevTool control={control} />
    </FormProvider >

  );
};