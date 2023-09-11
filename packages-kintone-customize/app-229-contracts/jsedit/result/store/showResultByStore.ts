import { createStoreContainer } from './createStoreContainer';
import { addHeaderTitle } from './addHeaderTitle';
import { createDateInit } from './createDateInit';
import createContractList from './createContractList';
import createWeeklyResult from './createWeeklyResult';
import './showResultByStore.css';


export const showResultByStore = ({
  storeId,
  records,
}:{
  storeId: string,
  records: DB.SavedRecord[],
}) => {

  const $storeContainer = createStoreContainer(storeId);

  addHeaderTitle($storeContainer);
  createDateInit($storeContainer);
  createContractList($storeContainer, records);
  createWeeklyResult($storeContainer, records);
  
};