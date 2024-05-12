import { PageTitle3 } from 'kokoas-client/src/components';
import { FormOrderInvoiceContainer } from './FormOrderInvoiceContainer';
import { Result } from './sections/result/Result';
import { Filter } from './sections/filter/Filter';
import schema, { TypeOfForm } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useParsedQuery } from './hooks/useParsedQuery';


export const FormOrderInvoice = () => {

  const parsedQuery = useParsedQuery();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: parsedQuery,
    resolver: zodResolver(schema),
    
  });

  const { control } = formReturn;


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