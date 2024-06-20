import { TInvoiceDetails } from '../schema';
import { useTypedFormContext, useTypedWatch } from './useTypedRHF';



export const useBillingTotal = () => {

  const [
    invoiceDetails,
    billedAmount,
  ] = useTypedWatch({
    name: [
      'invoiceDetails',
      'billedAmount',
    ],
  }) as [TInvoiceDetails, number];


  const { setValue } = useTypedFormContext();

  const handleChange = (amount: number, index: number) => {

    // 請求合計金額を更新する                  
    const billingAmount = invoiceDetails.reduce((acc, {
      billingAmount: tgtBillingAmt,
    }, idx) => {
      if (index === idx) {
        return acc + amount;
      }
      return acc + +tgtBillingAmt;
    }, 0);

    setValue('billingTotalAmount', billingAmount + billedAmount);
    setValue('billingAmount', billingAmount);
  };


  return {
    handleChange,
  };
};
