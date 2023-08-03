import { getAndpadProcurementByAndpadProjId } from 'api-kintone/src/andpadProcurement/getAndpadProcurementByAndpadProjId';
import { getCostManagement } from './getCostManagement';

/**
 * プロジェクトIDを渡されたら,
 * getCostManagementでデータの成形をして、
 * excelファイルを生成する
 * outputはbase64に変換する
 */
export const generateCostManagement = async (
  projId: string,
  andpadProjId: string,
) => {

  // 対象案件の発注一覧の取得
  const andpadOrders = await getAndpadProcurementByAndpadProjId(andpadProjId);
  
  const costManagementList = await getCostManagement(projId, andpadProjId, andpadOrders);


};