/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { defaultRecord, yasumiUsed } from '../backend/yasumiKanri';
import { resolveNewWeight, shiftToNext } from '../helpers/converters';
import yasumiSaveHandler from './yasumiSaveHandler';

const getAvailableDayTime = (newArray: any) => {
  const leaveDay = newArray.find(({ type }: any) => type.includes('leave'));

  if (!leaveDay) return 'day-whole';
  if (leaveDay.duration.includes('whole')) return null;

  return (leaveDay.duration.includes('am')) ? 'day-pm' : 'day-am';
};

const yasumiChangeHandler = ({
  info,
  yasumiRecords,
  remainingYasumi,
  savedRecords,
  maxYasumi,
  currentMonth,
  setSavedRecords,
  setRemainingYasumi,
  setYasumiRecords,
  setSnack,
  setIsSaving,
  seIsEditing,
}:{
  info: any;
  yasumiRecords: any;
  remainingYasumi: any;
  savedRecords: any;
  maxYasumi: any;
  currentMonth: any;
  setSavedRecords: any;
  setRemainingYasumi: any;
  setYasumiRecords: any;
  setSnack: any;
  setIsSaving: any;
  seIsEditing: any;
}) => {
  const { dateStr } = info;
  let newArray = yasumiRecords[dateStr] ? [...yasumiRecords[dateStr]] : [defaultRecord];
  let weight = 0;
  let newDuration;
  let newYasumiRecords: any;

  const availableTime = getAvailableDayTime(newArray);
  if (!availableTime) return;
  seIsEditing(true);
  if (newArray) {
    if (availableTime !== 'day-whole' && newArray.length === 1) newArray.unshift(defaultRecord); // newArray = newArray.concat(defaultRecord);

    newArray = [...newArray].map((item) => {
      if (item.type === 'day-ordinary') {
        newDuration = shiftToNext(item.duration, remainingYasumi, availableTime);
        weight = resolveNewWeight(item.duration, newDuration);
        return { ...item, duration: newDuration };
      }
      return { ...item };
    });

    newArray = newArray.filter(({ duration }) => Boolean(duration));

    if ((remainingYasumi - weight) < 0) {
      /* setSnackType('aboveLimit');
      setSnackOpen(true); */
      setSnack({ isOpen: true, type: 'aboveLimit' });
      seIsEditing(false);
      return; // cancel change if no more remaining yasumi
    }

    ReactDOM.unstable_batchedUpdates(() => {
      if (newArray.length) {
        setYasumiRecords((prev: any) => {
          newYasumiRecords = { ...prev, [dateStr]: newArray };

          return newYasumiRecords;
        });
      } else {
        setYasumiRecords((prev: any) => {
          const state = { ...prev };
          delete state[dateStr];
          newYasumiRecords = state;
          return state;
        });
      }
      setRemainingYasumi(maxYasumi.current - yasumiUsed(newYasumiRecords));
    });
  }

  yasumiSaveHandler({
    newYasumiRecords,
    savedRecords,
    currentMonth,
    maxYasumi,
    setSavedRecords,
    setRemainingYasumi,
    setYasumiRecords,
    setSnack,
    setIsSaving,
    seIsEditing,
  });
};

export default yasumiChangeHandler;
