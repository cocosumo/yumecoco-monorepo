import { SaveProjectData, saveProjectData } from '../types';
import { getMyOrders as getOrders } from './getMyOrders';

/**
 * ココアスの工事番号でAnpad案件情報を取得する
 * @param projId 
 */
export const getOrderByProjId = async (projId: string) => {
  return getOrders({ 
    q: `案件管理ID = ${projId}`,
    series: Object.keys(saveProjectData.shape) as (keyof SaveProjectData)[], 
  });
};