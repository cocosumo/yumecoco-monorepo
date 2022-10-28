import { fieldMatches } from '../../../helpers/fieldMatches';
import { APPIDS, KintoneRecord } from '../config';

const custFieldEqualTo = fieldMatches<KeyOfCustGroupAll>;

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
  easySearch,
  storeName,
} : {
  easySearch?: string,
  storeName?: string
}) => {
  const fields: KeyOfCustGroupAll[] = [
    'storeName',
    'customerName',
    'dump', // json contains all information about the customer
    'employeeName',
  ];

  const easySearchQuery = easySearch ? fields.map(fieldName => {
    return `${fieldName} like "${easySearch}"`;
  }).join(' or ') : undefined;

  const specificSearchQuery = [
    storeName ? custFieldEqualTo('storeName', storeName) : undefined,
  ]
    .filter(Boolean)
    .join(' and ');

  const query = [
    easySearchQuery,
    specificSearchQuery,
  ]
    .filter(Boolean)
    .map(q => {
      return `(${q})`;
    }).join(' and ');

  console.log(query);

  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query,
  }).then(rec => rec as unknown as TypeOfCustomerGroup[]);

};