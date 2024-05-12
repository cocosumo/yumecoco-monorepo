import { IOrder } from 'types';
import { TInvoiceForm } from '../schema';
import { summarizeItems } from 'api-kintone/src/order/helpers/summarizeItems';

export const convertOrderInfoToKintone = (data: TInvoiceForm) => {
  const {
    items,
  } = data;

  const {
    totalAmountAfterTax,
    totalAmountBeforeTax,
  } = summarizeItems(items);

  const kintoneRecord: Partial<IOrder> = {
    orderAmountAfterTax: { value: String(totalAmountAfterTax) }, 
    orderAmountBeforeTax: { value: String(totalAmountBeforeTax) },
  };

  return kintoneRecord;

};