import { getCostManagement } from './getCostManagement';

/**
 * プロジェクトIDを渡されたら,
 * getCostManagementでデータの成形をして、
 * excelファイルを生成する
 * outputはbase64に変換する
 */
export const generateCostManagement = () => {

  
  getCostManagement();

};