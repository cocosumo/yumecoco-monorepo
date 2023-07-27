import { generateCostManagement } from './generateCostManagement';

export const reqCostManagement = () => {
  
  const andpadProjId = '11487098'; // TODO:URLからandpadProjIdを取得する


  generateCostManagement(andpadProjId);

};