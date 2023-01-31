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
    handleSubmit,
    control,
  } = useFormMethods;

  const onSubmit = (data: TypeOfForm) => console.log(data);

  return (

    <FormProvider {...useFormMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
      <DevTool control={control} />
    </FormProvider >

  );
};