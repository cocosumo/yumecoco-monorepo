import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';

/**
 * プロジェクトIDを渡されたら,
 * getCostManagementでデータの成形をして、
 * excelファイルを生成する
 * outputはbase64に変換する
 */
export const generateCostManagement = async (
  projId: string,
) => {

  // 対象案件の発注一覧の取得
  
  const costManagementList = await getCostMgtDataByProjIdV2(projId);


};