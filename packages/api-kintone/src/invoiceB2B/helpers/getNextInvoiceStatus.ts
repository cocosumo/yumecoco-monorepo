import { KInvoiceProgress } from 'types/src/common/order';



export const getNextInvoiceStatus = (invoice: KInvoiceProgress | null): KInvoiceProgress => {
  switch (invoice) {
    case '請求済':
      return '請求確認済';
    case '請求確認済':
      return '請求承認済';
    case '請求承認済':
      return '支払済';
    default:
      return '請求確認済';
  }
};