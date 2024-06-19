import { TInvoiceDetails } from '../../schema';
import { BilledItem } from './getBilledItems';



export const getBillingItems = ({
  invoiceDetails,
}: {
  invoiceDetails: TInvoiceDetails
}) => {

  const billingItems = invoiceDetails.reduce((acc, {
    invoiceItem,
    billingAmount,
  }) => {
    if (invoiceItem !== '') {
      const itemContent = invoiceItem.split('-');

      acc.push({
        contractType: itemContent[0],
        label: itemContent[1],
        amount: billingAmount,
      });
    }
    return acc;

  }, [] as BilledItem[]);

  return billingItems;
};
