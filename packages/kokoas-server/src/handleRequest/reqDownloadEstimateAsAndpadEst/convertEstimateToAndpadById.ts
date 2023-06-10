import { getEstimateById } from 'api-kintone';
import { estimateToAndpadJson } from './conversions/estimateToAndpadJson';
import { andpadJsonToExcel } from './conversions/andpadJsonToExcel';



export const convertEstimateToAndpadById = async (estimateId: string) => {
  
  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  
  const estimateRec = await getEstimateById(estimateId);

  if (!estimateRec) throw new Error(`見積もりは見つかりませんでした： ${estimateId}`);

  const estJson = estimateToAndpadJson(estimateRec);

  const estExcel = andpadJsonToExcel(estJson);

  return {
    estExcel,
    estimateRec,
  };

};