import { Stack } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { DevTool } from '@hookform/devtools';

export const FilterForm = ({
  children,
}: {
  children: ReactNode
}) => {
  const urlParams = useURLParams<TypeOfForm>();
  const methods = useForm({
    defaultValues: urlParams,
  });
  const onSubmit = (data: TypeOfForm) => console.log(data);


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack>
          {children}
        </Stack>
      </form>
      <DevTool control={methods.control} />
    </FormProvider >
  );
};