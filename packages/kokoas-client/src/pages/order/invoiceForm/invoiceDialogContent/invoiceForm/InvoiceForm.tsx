import { InvoiceInputGrid } from './InvoiceInputGrid/InvoiceInputGrid';
import { InvoiceFormContainer } from './InvoiceFormContainer';
import { InvoiceInputFields } from './invoiceInputFields/InvoiceInputFields';

export const InvoiceForm = () => {
  return (
    <InvoiceFormContainer>
      <InvoiceInputGrid />
      <InvoiceInputFields />
    </InvoiceFormContainer>
  );
};