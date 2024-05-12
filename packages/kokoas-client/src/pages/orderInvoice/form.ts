import subYears from 'date-fns/subYears';
import { TypeOfForm } from './schema';
import addYears from 'date-fns/addYears';




export const initialValues: TypeOfForm = {
  status: undefined,
  projName: '',
  storeName: '',
  cocoAgName: '',
  supplierName: '',
  invoiceSystemNumber: '',
  orderAmount: 0,
  invoiceAmount: 0,

  // データ多くなる見込みで、全てのデータを表示すると重くなるため、初期値は1年前から1年後までに設定
  // 必要に応じて調整。
  invoiceDateFrom: subYears(new Date(), 1),
  invoiceDateTo: addYears(new Date(), 1),
};