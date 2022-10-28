import { APPIDS, KintoneRecord } from '../config';

/**
 * Searches following fields with a single search term.
 *
 * - custName 顧客名
 * - custEmail メール
 * - cocoAg ここすも担当者
 * - yumeAG ゆめてつAG
 * - store 店舗
 *
 * @param param
 * @param param.mainSearch 簡単検索
 */
export const searchCustomers = ({
  mainSearch,
} : {
  mainSearch: string
}) => {
  const fields: (KeyOfCustomerGroup | KeyOfCustomerGroupItem)[] = [
    'storeName',
    'customerName',
  ];

  const quickSearchQuery = fields.map(fieldName => {
    return `${fieldName} like "${mainSearch}"`;
  }).join(' or ');

  const query = [
    quickSearchQuery,
  ].map(q => {
    return `(${q})`;
  }).join(' and ');

  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query,
  }).then(rec => rec as unknown as TypeOfCustomerGroup[]);

};