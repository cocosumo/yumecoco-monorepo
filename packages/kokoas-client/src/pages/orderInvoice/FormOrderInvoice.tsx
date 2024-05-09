import { PageTitle3 } from 'kokoas-client/src/components';
//import { useForm } from 'react-hook-form';
//import { TForm, schema } from './schema';
//import { useResolveParams } from './hooks/useResolveParams';
//import { zodResolver } from '@hookform/resolvers/zod';
//import { FooterActionButtons } from './sections/footerActions/FooterActionButtons';
//import { useEffect } from 'react';
//import { FormOrderContainer } from './FormOrderContainer';
//import { OrderRequestDialog } from './orderRequestForm/OrderRequestDialog';
import { FormOrderInvoiceContainer } from './FormOrderInvoiceContainer';
import UnderConstruction from '../UnderConstruction';
//import { InvoiceFormDialog } from './invoiceForm/InvoiceFormDialog';


export const FormOrderInvoice = () => {

  /*   const {
    newFormValues,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: newFormValues,
    resolver: zodResolver(schema),
    
  });

  const { control, reset } = formReturn;

  useEffect(() => {
    reset({ ...newFormValues });
  }, [reset, newFormValues]);
 */


  return (
    <>

      <FormOrderInvoiceContainer >
        <PageTitle3 
          label={'請求一覧'}
        />
        <UnderConstruction />
      </FormOrderInvoiceContainer>
      
      {/* <InvoiceFormDialog /> */}
      {/* <OrderRequestDialog /> */}
    </>
  );
};