import { createStoreContainer } from './createStoreContainer';
import { createHeaderTitle } from './createHeaderTitle';
import { createDateInit } from './createDateInit';
import createContractList from './createContractList';
import createWeeklyResult from './createWeeklyResult';

/**
 * 特定の店舗の結果を表示する
 * @param storeId 
 * @param records 店舗の契約データを含む配列
*/
export const showResultByStore = ({
  storeId,
  records,
}:{
  storeId: string,
  records: DB.SavedRecord[],
}) => {

  const $storeContainer = createStoreContainer(storeId);

  createHeaderTitle($storeContainer, storeId);
  createDateInit($storeContainer);
  createContractList($storeContainer, records);
  createWeeklyResult($storeContainer, records);
  
};