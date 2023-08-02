import { generateCostManagement } from './generateCostManagement';

export const reqCostManagement = () => {
  
  const projId = '055c2aca-cbdd-42ab-be2a-e4cd6dd362de'; // システムID強制がある場合はそれを設定する 
  const andpadProjId = '11487098'; 
  // TODO:URLから工事のuuidを取得し、getOrderByProjId()にてandpadProjIdを取得する


  generateCostManagement(projId, andpadProjId);

};
