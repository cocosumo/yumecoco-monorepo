/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { yasumiRecToObj, yasumiUsed } from '../backend/yasumiKanri';

const refetchData = async ({
  currentMonth,
  setYasumiRecords,
  setRemainingYasumi,
  setSavedRecords,
  maxYasumi,
}:{
  currentMonth: any;
  setYasumiRecords: any;
  setRemainingYasumi: any;
  setSavedRecords: any;
  maxYasumi: any;
}) => {
  const yasumiObjs = await yasumiRecToObj(currentMonth.current);
  ReactDOM.unstable_batchedUpdates(() => {
    setRemainingYasumi(maxYasumi.current - yasumiUsed(yasumiObjs));
    setYasumiRecords(yasumiObjs);
    setSavedRecords(yasumiObjs);
  });
};

export default refetchData;
