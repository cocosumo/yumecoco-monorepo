import debounce from 'lodash/debounce';
import { addYasumiRecords, deleteRecordsByDates, updateYasumiRecords } from '../backend/yasumiKanri';
import { getOrdinaryYasumi } from '../helpers/converters';
import refetchData from './refetchData';

const deleteRecords = async ({
  /* Fix this */
  newYasumiRecords,
  savedRecords,
}:{
  newYasumiRecords: any;
  savedRecords: any
}) => {
  const datesToBeDeleted = [];
  Object.keys(savedRecords).forEach((key) => {
    if (!newYasumiRecords[key] || savedRecords[key].length > newYasumiRecords[key].length) {
      datesToBeDeleted.push(key);
    }
  });

  return deleteRecordsByDates(datesToBeDeleted);
};

const pushToRecordsToSave = (recordsToSaveArray: any, unsavedRecord: any, key: any) => {
  const dayOrdinary = getOrdinaryYasumi(unsavedRecord);
  if (dayOrdinary.length) {
    recordsToSaveArray.push({ ...{ date: key }, ...dayOrdinary[0] });
  }
};

const compareAndSaveRecords = async ({
  newYasumiRecords,
  savedRecords,
}) => {
  const recordsToAdd = [];
  const recordsToUpdate = [];

  Object.keys(newYasumiRecords).forEach(
    (key) => {
      if (!savedRecords[key]
        || newYasumiRecords[key].length > savedRecords[key].length) {
        pushToRecordsToSave(recordsToAdd, newYasumiRecords[key], key);
      } else if (
        JSON.stringify(newYasumiRecords[key]) !== JSON.stringify(savedRecords[key])) {
        pushToRecordsToSave(recordsToUpdate, newYasumiRecords[key], key);
      }
    },
  );

  const promises = [
    addYasumiRecords(recordsToAdd),
    updateYasumiRecords(recordsToUpdate, savedRecords),
  ];

  const settedPromises = Promise.allSettled(promises);
  return settedPromises;
};

const yasumiSaveHandler = debounce(async ({
  newYasumiRecords,
  savedRecords,
  maxYasumi,
  currentMonth,
  setSavedRecords,
  setRemainingYasumi,
  setYasumiRecords,
  /* setSnackType,
  setSnackOpen, */
  setSnack,
  setIsSaving,
  seIsEditing,
}:{
  newYasumiRecords: any;
  savedRecords: any;
  maxYasumi: any;
  currentMonth: any;
  setSavedRecords: any;
  setRemainingYasumi: any;
  setYasumiRecords: any;
  /* setSnackType: any;
  setSnackOpen: any; */
  setSnack: any;
  setIsSaving: any;
  seIsEditing: any;
}) => {
  setIsSaving(true);

  const promises = [
    deleteRecords({ savedRecords, newYasumiRecords }),
    compareAndSaveRecords({ savedRecords, newYasumiRecords }),
  ];

  const result = await Promise.allSettled(promises);
  console.log('success');
  const isSuccess = !JSON.stringify(result).includes('rejected');
  setSnack({ isOpen: true, type: isSuccess ? 'saveSuccess' : 'saveErrors' });

  await refetchData({
    currentMonth,
    setYasumiRecords,
    setSavedRecords,
    setRemainingYasumi,
    maxYasumi,
  });
  setIsSaving(false);
  seIsEditing(false);
}, 2000);

export default yasumiSaveHandler;
