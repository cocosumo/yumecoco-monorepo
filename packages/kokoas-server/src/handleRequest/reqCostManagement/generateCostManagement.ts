import { getCostMgtDataByProjId } from 'api-kintone';

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
  
  const costManagementList = await getCostMgtDataByProjId(projId);


};