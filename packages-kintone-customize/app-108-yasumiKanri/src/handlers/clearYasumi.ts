import { deleteRecordsByDates } from '../backend/yasumiKanri';
import refetchData from './refetchData';

const clearYasumi = async ({
  yasumiRecords,
  currentMonth,
  maxYasumi,
  setSavedRecords,
  setYasumiRecords,
  setRemainingYasumi,
  setSnack,
  setIsSaving,
}:{
  yasumiRecords: any;
  currentMonth: any;
  maxYasumi: any;
  setSavedRecords: any;
  setYasumiRecords: any;
  setRemainingYasumi: any;
  setSnack: any;
  setIsSaving: any;
}) => {
  setIsSaving(true);

  await deleteRecordsByDates(Object.keys(yasumiRecords));
  setSnack({ isOpen: true, type: 'resetInput' });
  await refetchData({
    currentMonth,
    setYasumiRecords,
    setSavedRecords,
    setRemainingYasumi,
    maxYasumi,
  });
  setIsSaving(false);
};

export default clearYasumi;
