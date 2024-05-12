import { PageTitle3 } from 'kokoas-client/src/components';
import { FormOrderInvoiceContainer } from './FormOrderInvoiceContainer';
import { Result } from './sections/result/Result';
import { Filter } from './sections/filter/Filter';
import schema, { TypeOfForm } from './schema';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useResolveParams } from './hooks/useResolveParams';


export const FormOrderInvoice = () => {

  const {
    initialForm,
  } = useResolveParams();
 
  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
    
  });

  const { control, reset } = formReturn;

  useEffect(() => {
    reset({ ...initialForm });
  }, [reset, initialForm]);



  return (
    <FormOrderInvoiceContainer
      formReturn={formReturn}
    >
      <PageTitle3 
        label={'請求一覧'}
      />
      <Filter />
      <Result />
      <DevTool control={control} />

    </FormOrderInvoiceContainer>
  );
};