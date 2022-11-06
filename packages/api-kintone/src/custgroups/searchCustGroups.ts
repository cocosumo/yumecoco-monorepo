import { fieldMatches } from './../common/fieldMatches';
import { getAgentType, KFlatCustGroup } from 'types';
import { appId, RecordType } from './config';
import { ktRecord } from '../client';

const custFieldMatches = fieldMatches<KFlatCustGroup>;

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
export const searchCustGroups = async ({
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
  const fields: KFlatCustGroup[] = [
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
    yumeAg ? `(${custFieldMatches('employeeName', yumeAg)}) and ${custFieldMatches('agentType', getAgentType('yumeAG'))}` : undefined,
    cocoAg ? `(${custFieldMatches('employeeName', cocoAg)}) and ${custFieldMatches('agentType', getAgentType('cocoAG'))}` : undefined,
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

  return (await ktRecord()).getAllRecords({
    app: appId,
    condition: query,
  }).then(rec => rec as unknown as RecordType[]);

};