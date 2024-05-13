import subYears from 'date-fns/subYears';
import { TypeOfForm } from './schema';
import addYears from 'date-fns/addYears';
import { KeyOfSearchResult } from './types';




export const initialValues: TypeOfForm = {
  orderBy: 'invoiceDate' as KeyOfSearchResult,
  order: 'desc',
  status: undefined,
  projName: '',
  storeName: '',
  cocoAgName: '',
  supplierName: '',
  invoiceSystemNumber: '',
  orderAmount: undefined,
  invoiceAmount: undefined,

  // データ多くなる見込みで、全てのデータを表示すると重くなるため、初期値は1年前から1年後までに設定
  // 必要に応じて調整。
  invoiceDateFrom: subYears(new Date(), 1),
  invoiceDateTo: addYears(new Date(), 1),
};