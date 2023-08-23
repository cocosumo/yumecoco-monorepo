import { useState } from 'react';
import { isValidTimeDuration } from '../../helpers/isValidTimeDuration';
import { getConflictReservations } from '../../helpers/getConflictReservation';
import { extractBasicCarDetails, toArray } from '../../helpers/extractBasicDetails';
import { DateTime as dt } from 'luxon';
import { onFieldChange } from 'api-kintone';
import { KSavedRecord } from '../../types/event';



const watchFieldKeys : (KSavedRecord)[] = [
  '開始',
  '終了',
  '店舗',
  'fullDay',
  'returnDate',
];

const returnDateKey: KSavedRecord = 'returnDate';

const onChangeTriggers = onFieldChange(watchFieldKeys);

export const useChangeListener = ({
  initialRecord,
  allCars,
}:{
  initialRecord: kintone.types.SavedCarAppFields;
  allCars: kintone.types.SavedCarAppFields[];
}) => {
  const [conflictReservations, setConflictReservations] = useState<DB.SavedRecord[]>([]);
  const [selectedCar, setSelectedCar] = useState(extractBasicCarDetails(initialRecord));

  const [duration, setDuration] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });

  const updateAvailableCarsHandler = (
    event: {
      record: DB.SavedRecord;
      type: string;
    },
  ) => {
    const {
      record: availableCarsRecord,
      type,
    } = event;

    console.log(event);

    const { 開始, 終了, 期間, fullDay, returnDate } = availableCarsRecord;

    const isFullDay = fullDay.value.includes('終日');

    if (type.includes(returnDateKey)) {
      // If return date is changed, set the return date to the end date
      終了.value = returnDate.value;
    }

    if (isFullDay) {
      if (開始.value) {
        const start = dt.fromISO(開始.value);
        開始.value = start.set({ hour: 0, minute: 1 }).toISO() || '';
      }

      if (終了.value) {
        const end = dt.fromISO(終了.value);
        終了.value = end.set({ hour: 23, minute: 59 }).toISO() || '';
      }
    }

    const isValid = isValidTimeDuration(開始.value, 終了.value);
    if (isValid) {
      getConflictReservations(availableCarsRecord)
        .then((resp) => {
          setConflictReservations(resp.records);
          setSelectedCar(extractBasicCarDetails(availableCarsRecord));
        });
    } else {

      // 終了.value = 開始.value;
      console.log('期間:', 期間);
    }

    setDuration({ start: 開始.value, end: 終了.value });

    return event;
  };

  const arrAllCars = toArray(allCars);
  const arrConflictReservations = toArray(conflictReservations);
  const arrAvailableCars = arrAllCars.filter(
    ([, mainCN]) => !arrConflictReservations.some(([, CN]) => mainCN === CN),
  );
  const arrOtherAvailableCars = arrAvailableCars.filter(([, CN]) => selectedCar[1] !== CN);
  const isSelectedCarAvailable = arrAvailableCars.some(([, CN]) => selectedCar[1] === CN);
  const isOtherCarsAvailable = arrOtherAvailableCars.length > 0;
  const isCarSelected = !!selectedCar[1];

  const isDurationEmpty = !(duration.start && duration.end);
  const isValidDuration = isValidTimeDuration(duration.start, duration.end);
  const isNoDuration = duration.start === duration.end;

  kintone.events.off(onChangeTriggers);
  kintone.events.on(onChangeTriggers, updateAvailableCarsHandler);

  console.log('rendered2');

  return {
    updateAvailableCarsHandler,
    conflictReservations,
    selectedCar,
    duration,

    isSelectedCarAvailable,
    isOtherCarsAvailable,
    isCarSelected,

    isDurationEmpty,
    isValidDuration,
    isNoDuration,

    arrOtherAvailableCars,
  };
};