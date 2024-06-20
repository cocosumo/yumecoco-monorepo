import { TInvoiceDetails } from '../schema';
import { useTypedFormContext, useTypedWatch } from './useTypedRHF';



export const useBillingTotal = () => {

  const [
    invoiceDetails,
  ] = useTypedWatch({
    name: [
      'invoiceDetails',
    ],
  }) as [TInvoiceDetails];


  const { setValue } = useTypedFormContext();

  const handleChange = (amount: number, index: number) => {

    // 請求合計金額を更新する                  
    const billingTotal = invoiceDetails.reduce((acc, {
      billingAmount,
    }, idx) => {
      if (index === idx) {
        return acc + amount;
      }
      return acc + +billingAmount;
    }, 0);
    setValue('billingTotalAmount', billingTotal);
  };


  return {
    handleChange,
  };
};
