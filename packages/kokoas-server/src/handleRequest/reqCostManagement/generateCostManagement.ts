import { getAndpadOrdersByAndpadProjId } from 'api-kintone/src/andpadOrders/getAndpadOrdersByAndpadProjId';
import { getCostManagement } from './getCostManagement';

/**
 * プロジェクトIDを渡されたら,
 * getCostManagementでデータの成形をして、
 * excelファイルを生成する
 * outputはbase64に変換する
 */
export const generateCostManagement = (andpadProjId: string) => {

  // 対象案件の発注一覧の取得
  const andpadOrders = getAndpadOrdersByAndpadProjId(andpadProjId);
  
  const costManagementList = getCostManagement(andpadOrders);


};