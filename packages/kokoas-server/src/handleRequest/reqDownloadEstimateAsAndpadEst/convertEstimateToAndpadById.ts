import { getEstimateById } from 'api-kintone';
import { estimateToAndpadJson } from './conversions/estimateToAndpadJson';
import { andpadJsonToExcel } from './conversions/andpadJsonToExcel';


/**
 * 必要な情報:
 * 
 *  明細名
 *  工事種類
 *  備考
 *  見積金額単価
 *  見積原価単価
 *  本体/追加
 *  数量
 *  単位
 *  実行予算単価
 *  メモ
 */

export const convertEstimateToAndpadById = async (estimateId: string) => {
  
  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  
  const estimateRec = await getEstimateById(estimateId);

  if (!estimateRec) throw new Error(`見積もりは見つかりませんでした： ${estimateId}`);

  const estJson = estimateToAndpadJson(estimateRec);

  const estExcel = andpadJsonToExcel(estJson);

  return estExcel;

};