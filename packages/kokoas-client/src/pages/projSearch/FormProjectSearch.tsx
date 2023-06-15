
import { FormProvider, useForm } from 'react-hook-form';
import schema, { TypeOfForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter } from './sections/filter/Filter';
import { Alert, Stack } from '@mui/material';
import { PageTitle3 } from 'kokoas-client/src/components/ui/labels/PageTitle3';
import { Result } from './sections/result/Result';
import { useParseQuery } from './hooks/useParseQuery';


export const FormProjectSearch = () => {
  const parsedQuery = useParseQuery();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: parsedQuery,
    resolver: zodResolver(schema),
    
  });

  return (
    <Stack
      spacing={2}
    >
      <PageTitle3 label='顧客一覧' color='#333333' />
      
      <FormProvider {...formReturn}>
        <Filter />
      </FormProvider>
      <Alert severity='info'>
        ベータ版です。機能追加や修正が入る可能性があります。不具合報告やご要望は、
        <a href='https://rdmuhwtt6gx7.cybozu.com/k/236/edit' target='_blank' rel='noopener noreferrer'>
          こちら。
        </a>
        安定版になったら、このメッセージは消えます。
      </Alert>

      <Result />

    </Stack>
  );
};