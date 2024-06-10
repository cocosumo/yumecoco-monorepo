import { EmptyBox, PageSubTitle3, PageTitle3 } from 'kokoas-client/src/components';
import { useForm } from 'react-hook-form';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceFormDialog } from 'kokoas-client/src/components/ui/dialogs/invoiceForm/InvoiceFormDialog';
import { FormInvoiceContainer } from './FormInvoiceContainer';
import { TForm, schema } from './schema';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { Fragment, useEffect } from 'react';
import { ContractInfo } from './sections/contractInfo/ContractInfo';
import { CustomerInfo } from './sections/CustomerInfo';
import { ProjInfo } from './sections/ProjInfo';


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

        {newFormValues.projId && (
          <Fragment>
            <PageSubTitle3 label={'顧客情報'} />
            <CustomerInfo />

            <PageSubTitle3 label={'工事情報'} />
            <ProjInfo />

            <PageSubTitle3 label={'契約情報'} />
            <ContractInfo />


            {/* <Actions />
        <OrderBudgetDataGrid />
        <FooterActionButtons /> */}
            {/* <OrderRequestDialog /> */}
          </Fragment>
        )}

        {!newFormValues.projId && (
          <EmptyBox>
            工事を選択してください
          </EmptyBox>

        )}
      </FormInvoiceContainer>

      <InvoiceFormDialog />
    </>
  );
};
