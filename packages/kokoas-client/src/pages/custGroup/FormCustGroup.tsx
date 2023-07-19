import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Stack } from '@mui/material';
import { PageSubTitle3, PageTitle3 } from 'kokoas-client/src/components';
import { useResolveParams } from './hooks/useResolveParams';
import { OfficersInput } from './sections/officersInput/OfficersInput';
import { DevTool } from '@hookform/devtools';
import { CustomersInput } from './sections/customersInput/CustomersInput';
import { MemoInput } from './sections/memoInput/MemoInput';
import { Actions } from './sections/actions/Actions';

export const FormCustGroup = () => {
  const initialValues = useResolveParams();
  const formReturn = useForm<TForm>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const {
    custGroupId,
  } = initialValues;


  return (
    <FormProvider {...formReturn}>
      <Form
        noValidate
      >
        <Stack spacing={2}>
          <PageTitle3 
            label={`顧客登録（個人）${custGroupId ? '編集' : '登録'}`}
          />

          <PageSubTitle3 label={'顧客情報'} />
          <CustomersInput />

          <PageSubTitle3 label={'担当者情報'} />
          <OfficersInput />

          <PageSubTitle3 label={'備考'} />
          <MemoInput />

          <Divider />
          <Actions />

        </Stack>

      </Form>
      <DevTool control={formReturn.control} />
    </FormProvider>
  );
};