import { getCostMgtDataByProjId } from './getCostMgtDataByProjId';

/**
 * プロジェクトIDを渡されたら,
 * getCostManagementでデータの成形をして、
 * excelファイルを生成する
 * outputはbase64に変換する
 * 
 * @deprecated generateCostManagementV2 に移行
 */
export const generateCostManagement = async (
  projId: string,
) => {

  // 対象案件の発注一覧の取得
  
  const costManagementList = await getCostMgtDataByProjId(projId);


};