import { KInvoiceProgress } from 'types/src/common/order';



export const getPrevInvoiceStatus = (invoice: KInvoiceProgress | null): KInvoiceProgress | null => {
  switch (invoice) {
    case '支払済':
      return '請求承認済';
    case '請求承認済':
      return '請求確認済';
    case '請求確認済':
    case '請求済':
      return null;
    default:
      return '請求確認済';
  }
};