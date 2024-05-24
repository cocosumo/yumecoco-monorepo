import { PageTitle3 } from 'kokoas-client/src/components';
import { useForm } from 'react-hook-form';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceFormDialog } from 'kokoas-client/src/components/ui/dialogs/invoiceForm/InvoiceFormDialog';
import { FormInvoiceContainer } from './FormInvoiceContainer';
import { TForm, schema } from './schema';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { useEffect } from 'react';


export const FormInvoice = () => {

  const {
    newFormValues,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: newFormValues,
    resolver: zodResolver(schema),
  });

  const { control, reset } = formReturn;

  /* initialFormが変わったら、リセットする */
  useEffect(() => {
    reset({ ...newFormValues });
  }, [reset, newFormValues]);



  return (
    <>
      <FormInvoiceContainer formReturn={formReturn}>
        <PageTitle3
          label={'顧客請求書作成'}
        />

        <SearchProjects
          navigateTo={pages.projInvoiceV2}
          controllerProps={{
            name: 'projId',
            control,
          }}
        />

        {/* <Actions />
        <OrderBudgetDataGrid />
        <FooterActionButtons /> */}
        工事中
      </FormInvoiceContainer>

      <InvoiceFormDialog />
      {/* <OrderRequestDialog /> */}
    </>
  );
};
