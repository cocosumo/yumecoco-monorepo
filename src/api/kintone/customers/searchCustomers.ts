import { fieldMatches } from '../../../helpers/fieldMatches';
import { agentTypes } from '../../../types/commonTypes';
import { APPIDS, KintoneRecord } from '../config';

const custFieldMatches = fieldMatches<KeyOfCustGroupAll>;

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
  custEmail,
  yumeAg,
  cocoAg,
} : {
  easySearch?: string,
  storeName?: string,
  custEmail?: string,
  cocoAg?: string,
  yumeAg?: string,
}) => {
  const fields: KeyOfCustGroupAll[] = [
    'storeName',
    'customerName',
    'dump', // json contains all information about the customer
    'employeeName',
    'email',

  ];

  const easySearchQuery = easySearch ? fields.map(fieldName => {
    return `${fieldName} like "${easySearch}"`;
  }).join(' or ') : undefined;

  const specificSearchQuery = [
    storeName ? custFieldMatches('storeName', storeName) : undefined,
    custEmail ? custFieldMatches('dump', custEmail) : undefined,
    yumeAg ? `(${custFieldMatches('employeeName', yumeAg)}) and ${custFieldMatches('agentType', agentTypes.yumeAG)}` : undefined,
    cocoAg ? `(${custFieldMatches('employeeName', cocoAg)}) and ${custFieldMatches('agentType', agentTypes.cocoAG)}` : undefined,
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

  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query,
  }).then(rec => rec as unknown as TypeOfCustomerGroup[]);

};