import { IInvoiceb2c } from 'types';



export type BilledItem = {
  contractType: string;
  label: string;
  amount: number;
};

export const getBilledItems = ({
  invoices,
}: {
  invoices: IInvoiceb2c[]
}) => {

  const billedItems = invoices.reduce((acc, invoice) => {
    const { invoiceDetails: {
      value: tgtInvoiceDetails,
    } } = invoice;

    for (let i = 0; i < tgtInvoiceDetails.length; i++) {
      const itemContent = tgtInvoiceDetails[i].value.invoiceItem.value.split('-');

      acc.push({
        contractType: itemContent[0],
        label: itemContent[1],
        amount: +tgtInvoiceDetails[i].value.billingAmountAfterTax.value,
      });
    }

    return acc;
  }, [] as BilledItem[]);



  return billedItems;
};
