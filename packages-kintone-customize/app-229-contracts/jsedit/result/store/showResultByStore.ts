import { createStoreContainer } from './createStoreContainer';
import { createHeaderTitle } from './createHeaderTitle';
import { createDateInit } from './createDateInit';
import createContractList from './createContractList';
import createWeeklyResult from './createWeeklyResult';


export const showResultByStore = ({
  storeId,
  records,
}:{
  storeId: string,
  records: DB.SavedRecord[],
}) => {

  const $storeContainer = createStoreContainer(storeId);

  createHeaderTitle($storeContainer);
  createDateInit($storeContainer);
  createContractList($storeContainer, records);
  createWeeklyResult($storeContainer, records);
  
};