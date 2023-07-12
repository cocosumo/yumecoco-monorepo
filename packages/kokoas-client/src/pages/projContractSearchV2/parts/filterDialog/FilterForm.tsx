import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { DevTool } from '@hookform/devtools';

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

    <FormProvider {...useFormMethods}>
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        {children}
      </form>
      <DevTool control={control} />
    </FormProvider >

  );
};