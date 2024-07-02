import { IInvoiceb2c } from 'types';



export type BilledItem = {
  contractType: string;
  label: string;
  amount: number;
};

export const getBilledItems = ({
  invoices,
  invoiceId,
}: {
  invoices: IInvoiceb2c[] | undefined
  invoiceId: string,
}) => {

  if (!invoices) return [] as BilledItem[];

  const billedItems = invoices.reduce((acc, invoice) => {
    const {
      uuid,
      invoiceDetails: {
        value: tgtInvoiceDetails,
      },
    } = invoice;

    if (invoiceId === uuid.value) return acc;

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
