import { InvoiceDialogContainer } from './InvoiceDialogContainer';
import { InvoiceForm } from './invoiceForm/InvoiceForm';
import { InvoiceNavigation } from './invoiceNavigation/InvoiceNavigation';

export const InvoiceDialogContent = () => {

  return (
    <InvoiceDialogContainer>
      <InvoiceNavigation />
      <InvoiceForm />
    </InvoiceDialogContainer>
  );
};